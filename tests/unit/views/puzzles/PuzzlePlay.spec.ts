/** @jest-environment jsdom */
import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import PuzzlePlay from '@/views/puzzles/PuzzlePlay/PuzzlePlay.vue';

describe('PuzzlePlay.vue solution URLs', () => {
  const puzzleId = '9943819';
  const iframePath = `/eternajs/dist/prod/index.html?puzzle=${puzzleId}`;
  const originalBaseUrl = process.env.VUE_APP_API_BASE_URL;
  let wrapper: Wrapper<Vue>;
  let get: jest.Mock;
  let post: jest.Mock;
  let route: { params: { id: string } };

  const play = () => wrapper.vm as Vue & {
    loadNewPuzzle(id: string): Promise<void>;
    puzzleChanged(id: string): void;
  };

  const renderSequence = async (sequence: string | null | undefined) => {
    await wrapper.setData({ iframePuzzleId: puzzleId, iframeSequence: sequence });
    return wrapper.find('iframe').attributes().src;
  };

  beforeEach(() => {
    process.env.VUE_APP_API_BASE_URL = '';
    route = { params: { id: '' } };
    get = jest.fn();
    post = jest.fn().mockResolvedValue({});
    wrapper = shallowMount(PuzzlePlay, {
      mocks: {
        $route: route,
        $router: { push: jest.fn() },
        $vxm: { user: { uid: 'synthetic-user' } },
        $http: { get, post },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
    process.env.VUE_APP_API_BASE_URL = originalBaseUrl;
    jest.restoreAllMocks();
  });

  it.each([null, undefined, ''])('uses the normal puzzle URL for sequence %s', async sequence => {
    expect(await renderSequence(sequence)).toBe(iframePath);
  });

  it('preserves the existing URL for ordinary RNA sequences', async () => {
    expect(await renderSequence('AUGCAU')).toBe(`${iframePath}&sequence=AUGCAU`);
  });

  it('keeps a sequence at the exact 2000-character absolute URL boundary', async () => {
    const prefix = new URL(`${iframePath}&sequence=`, window.location.href).href;
    const sequence = 'A'.repeat(2000 - prefix.length);
    const src = await renderSequence(sequence);
    expect(new URL(src, window.location.href).href).toHaveLength(2000);
    expect(src).toBe(`${iframePath}&sequence=${sequence}`);
  });

  it('omits the entire sequence one character beyond the boundary', async () => {
    const prefix = new URL(`${iframePath}&sequence=`, window.location.href).href;
    expect(await renderSequence('A'.repeat(2001 - prefix.length))).toBe(iframePath);
  });

  it('never renders an oversized candidate or mutates the saved RNA sequence', async () => {
    const sequence = 'AUGC'.repeat(10000);
    expect(await renderSequence(sequence)).toBe(iframePath);
    expect(wrapper.vm.$data.iframeSequence).toBe(sequence);
    expect(wrapper.find('iframe').attributes('src')).not.toContain('sequence=');
  });

  it('accounts for the absolute API base URL and preserves its iframe path and puzzle ID', async () => {
    const base = `https://eternadev.org/${'x'.repeat(100)}`;
    process.env.VUE_APP_API_BASE_URL = base;
    const basePuzzleUrl = `${base}${iframePath}`;
    const sequence = 'G'.repeat(2001 - `${basePuzzleUrl}&sequence=`.length);
    expect(await renderSequence(sequence)).toBe(basePuzzleUrl);
    const url = new URL(wrapper.find('iframe').attributes().src);
    expect(url.pathname).toBe(`/${'x'.repeat(100)}/eternajs/dist/prod/index.html`);
    expect(url.searchParams.get('puzzle')).toBe(puzzleId);
  });

  it('encodes query delimiters without altering the original sequence', async () => {
    const sequence = 'AU&G C+#';
    const src = await renderSequence(sequence);
    expect(src).toBe(`${iframePath}&sequence=${encodeURIComponent(sequence)}`);
    expect(new URL(src, window.location.href).searchParams.get('sequence')).toBe(sequence);
    expect(wrapper.vm.$data.iframeSequence).toBe(sequence);
  });

  it('counts encoded sequence expansion before applying the length limit', async () => {
    const sequence = 'A '.repeat(600);
    expect(`${iframePath}&sequence=${sequence}`.length).toBeLessThan(2000);
    expect(await renderSequence(sequence)).toBe(iframePath);
  });

  it('counts the browser origin and encoded base path for a relative API URL', async () => {
    process.env.VUE_APP_API_BASE_URL = '/path with spaces';
    const basePuzzleUrl = `/path with spaces${iframePath}`;
    const prefix = new URL(`${basePuzzleUrl}&sequence=`, window.location.href).href;
    const sequence = 'C'.repeat(2001 - prefix.length);
    expect(await renderSequence(sequence)).toBe(basePuzzleUrl);
  });

  it.each(['AUGC', 'AUGC'.repeat(10000)])('loads a saved Challenge solution and refreshes the iframe nonce', async sequence => {
    const savedSolution = { sequence };
    get.mockResolvedValueOnce({ data: { data: { puzzle: { type: 'Challenge' } } } });
    get.mockResolvedValueOnce({ data: { data: { solutions: [savedSolution] } } });
    jest.spyOn(Date, 'now').mockReturnValue(123456789);
    route.params.id = puzzleId;
    await new Promise(resolve => { setTimeout(resolve, 0); });
    expect(get).toHaveBeenNthCalledWith(1, `/get/?type=puzzle&nid=${puzzleId}`);
    expect(get).toHaveBeenNthCalledWith(2, `/get/?type=solutions&puznid=${puzzleId}&uid=synthetic-user`);
    expect(wrapper.vm.$data.iframeSequence).toBe(sequence);
    expect(savedSolution.sequence).toBe(sequence);
    expect(wrapper.vm.$data.iframeNonce).toBe('123456789');
    expect(wrapper.find('iframe').attributes('src')).toBe(
      sequence.length < 2000 ? `${iframePath}&sequence=${sequence}` : iframePath,
    );
    expect(post).toHaveBeenCalledTimes(1);
  });

  it('keeps the existing iframe when navigation originates inside the game', async () => {
    await wrapper.setData({
      iframePuzzleId: puzzleId, iframeSequence: 'AUGC', iframeNonce: 'existing', currentlyRouting: true,
    });
    const iframe = wrapper.find('iframe').element;
    route.params.id = '123';
    await Vue.nextTick();
    expect(wrapper.find('iframe').element).toBe(iframe);
    expect(wrapper.vm.$data.iframeNonce).toBe('existing');
    expect(wrapper.vm.$data.currentlyRouting).toBe(false);
    expect(get).not.toHaveBeenCalled();
    expect(post).toHaveBeenCalledTimes(1);
  });

  it('clears a previous solution when loading a non-Challenge puzzle', async () => {
    await renderSequence('AUGC');
    get.mockResolvedValueOnce({ data: { data: { puzzle: { type: 'Experimental' } } } });
    await play().loadNewPuzzle('123');
    await Vue.nextTick();
    expect(get).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$data.iframeSequence).toBeNull();
    expect(wrapper.find('iframe').attributes('src')).toBe('/eternajs/dist/prod/index.html?puzzle=123');
  });

  it('loads a new puzzle for navigation outside the iframe', () => {
    const load = jest.spyOn(play(), 'loadNewPuzzle').mockResolvedValue();
    play().puzzleChanged('123');
    expect(load).toHaveBeenCalledWith('123');
  });
});
