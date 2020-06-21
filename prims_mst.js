const getAdjacencyList = function (arr) {
  const json = {};
  for (let index = 0; index < arr.length; index++) {
    const [key, value, weight] = arr[index];
    if (json[key] === undefined) {
      json[key] = [[value, weight]];
      json[key] = [[value, weight]];
    } else {
      json[key].push([value, weight]);
    }
  }
  return json;
};

const getMinWeightedNode = function (graph, nodes) {
  const neighbors = {};
  nodes.forEach((root) => {
    neighbors[root] = graph[root];
  });
  const unvisitedNeighbors = {};
  for (const vertex in neighbors) {
    const temp = neighbors[vertex].filter((e) => !nodes.has(e[0]));
    unvisitedNeighbors[vertex] = temp;
  }
  let minWeight = Infinity;
  for (const vertex in unvisitedNeighbors) {
    minWeight = unvisitedNeighbors[vertex].reduce((c, e) => {
      return e[1] > c ? c : e[1];
    }, minWeight);
  }
  for (const vertex in unvisitedNeighbors) {
    let minWeightNeighbor = unvisitedNeighbors[vertex].find(
      (node) => node[1] === minWeight
    );
    if (minWeightNeighbor !== undefined) {
      const temp = {};
      temp[vertex] = minWeightNeighbor;
      return temp;
    }
  }
};

const primsMst = function (graph) {
  const pairs = [];
  const alreadyVisited = new Set();
  const vertices = Object.keys(graph);
  let root = vertices[0];
  alreadyVisited.add(root);
  while (!vertices.every((e) => alreadyVisited.has(e))) {
    const minWeightNeighbor = getMinWeightedNode(graph, alreadyVisited);
    const node = Object.keys(minWeightNeighbor)[0];
    [root, weight] = minWeightNeighbor[node];
    minWeightNeighbor && pairs.push([node, root, weight]);
    alreadyVisited.add(root);
  }
  return getAdjacencyList(pairs);
};

const pairs = [
  ['a', 'b', 2],
  ['a', 'c', 3],
  ['c', 'd', 1],
  ['c', 'e', 3],
  ['c', 'f', 8],
  ['c', 'b', 5],
  ['d', 'e', 2],
  ['e', 'f', 4],
  ['b', 'g', 3],
  ['g', 'f', 6],
  ['b', 'a', 2],
  ['c', 'a', 3],
  ['d', 'c', 1],
  ['e', 'c', 3],
  ['f', 'c', 8],
  ['b', 'c', 5],
  ['e', 'd', 2],
  ['f', 'e', 4],
  ['g', 'b', 3],
  ['f', 'g', 6],
];

const graph = getAdjacencyList(pairs);
console.log(graph);
const mst = primsMst(graph);
console.log(mst);
