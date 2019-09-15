export default {
  getPuzzleMiddleThumbnail(nid: string) {
    return `https://s3.amazonaws.com/eterna/puzzle_mid_thumbnails/thumbnail${nid}.png`;
  },
  getPuzzleCloudThumbnail(nid: string) {
    return `https://s3.amazonaws.com/eterna/puzzle_cloud_thumbnails/thumbnail${nid}.png`;
  },
};
