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

const createDistanceTable = function (graph) {
  const table = {};
  const nodes = Object.keys(graph);
  nodes.forEach((e) => {
    table[e] = Infinity;
  });
  return table;
};

const getUnvisitedNeighbors = function (graph, visited) {
  const unvisitedNeighbors = graph.filter((e) => {
    return !visited.has(e[0]);
  });
  return unvisitedNeighbors;
};

const updateTable = function (table, unvisitedNeighbors, currentNode) {
  unvisitedNeighbors.forEach((e) => {
    if (e[1] < table[e[0]]) {
      table[e[0]] = table[currentNode] + e[1];
    }
  });
  return table;
};

const findCurrentNode = function (table, visited) {
  let minValue = Infinity;
  let currentNode;
  for (const node in table) {
    if (!visited.has(node)) {
      if (table[node] < minValue) {
        currentNode = node;
        minValue = table[node];
      }
    }
  }
  return currentNode;
};

const hasAllIncluded = function (vertices, visited) {
  return vertices.every((e) => visited.has(e));
};

const getShortestPath = function (graph, source, target) {
  const vertices = Object.keys(graph);
  let table = createDistanceTable(graph);
  table[source] = 0;
  const visited = new Set();
  let currentNode = source;

  while (!hasAllIncluded(vertices, visited) && !visited.has(target)) {
    const neighbors = graph[currentNode];
    const unvisitedNeighbors = getUnvisitedNeighbors(neighbors, visited);
    updateTable(table, unvisitedNeighbors, currentNode);
    visited.add(currentNode);
    currentNode = findCurrentNode(table, visited);
  }
  console.log(table);
  return table[target];
};

const pairs = [
  ['a', 'b', 5],
  ['b', 'e', 2],
  ['e', 'f', 2],
  ['f', 'd', 4],
  ['d', 'c', 1],
  ['c', 'a', 8],
  ['b', 'c', 3],
  ['b', 'd', 1],
  ['b', 'a', 5],
  ['e', 'b', 2],
  ['f', 'e', 2],
  ['d', 'f', 4],
  ['c', 'd', 1],
  ['a', 'c', 8],
  ['c', 'b', 3],
  ['d', 'b', 1],
];

const graph = getAdjacencyList(pairs);

const shortestPath = getShortestPath(graph, 'a', 'a');
console.log(shortestPath);
