interface PuzzleData {
  id: string;
  title?: string;
  nid: string;
}
export default interface PuzzleDataPage {
  puzzle: PuzzleData;
  nid: string;
}
