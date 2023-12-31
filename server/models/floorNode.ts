interface FloorNode {
  aisle: number | null;
  bay: number | null;
  category: string | null;
  neighbors: FloorNode[] | null;
}

// initialize first intermediate (non-aisle) node
let floorNodes: FloorNode = {
  aisle: null,
  bay: null,
  category: null,
  neighbors: null,
};
