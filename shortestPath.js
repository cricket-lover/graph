const getAdjacencyList = function (pairs) {
  const graph = {};
  for (let index = 0; index < pairs.length; index++) {
    const [key, value, weight] = pairs[index];
    if (graph[key] === undefined) {
      graph[key] = [[value, weight]];
      graph[key] = [[value, weight]];
    } else {
      graph[key].push([value, weight]);
    }
  }
  return graph;
};

const createDistanceTable = function (nodes, source) {
  const table = {};
  nodes.forEach((e) => {
    table[e] = { distance: Infinity };
  });
  table[source].distance = 0;
  return table;
};

const getUnvisitedNeighbors = function (vertices, visited) {
  const unvisitedNeighbors = vertices.filter((e) => {
    return !visited.has(e[0]);
  });
  return unvisitedNeighbors;
};

const updateTable = function (table, unvisitedNeighbors, currentNode) {
  unvisitedNeighbors.forEach(([to, weight]) => {
    if (weight < table[to].distance) {
      table[to].distance = table[currentNode].distance + weight;
      table[to].parent = currentNode;
    }
  });
  return table;
};

const findCurrentNode = function (table, visited) {
  let minValue = Infinity;
  let currentNode;
  for (const node in table) {
    if (!visited.has(node)) {
      if (table[node].distance < minValue) {
        currentNode = node;
        minValue = table[node].distance;
      }
    }
  }
  return currentNode;
};

const hasAllProcessed = function (vertices, visited) {
  return vertices.every((e) => visited.has(e));
};

const getPath = function (table, source, target) {
  const path = [target];
  while (table[target].parent !== source) {
    path.unshift(table[target].parent);
    target = table[target].parent;
  }
  return [source].concat(path);
};

const getShortestPath = function (graph, source, target) {
  const nodes = Object.keys(graph);
  const vertices = new Set();
  nodes.forEach((vertex) => vertices.add(vertex));
  let table = createDistanceTable(nodes, source);
  const visited = new Set();
  let currentNode = source;

  while (vertices.size !== visited.size && !visited.has(target)) {
    const neighbors = graph[currentNode];
    const unvisitedNeighbors = getUnvisitedNeighbors(neighbors, visited);
    updateTable(table, unvisitedNeighbors, currentNode);
    visited.add(currentNode);
    currentNode = findCurrentNode(table, visited);
  }
  const path = getPath(table, source, target);
  return [table, table[target].distance, path];
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

const source = 'a';
const destination = 'f';
const [table, minDistance, path] = getShortestPath(graph, source, destination);
console.log(
  table,
  `\nminimum distance from ${source} to ${destination} is ${minDistance}\nshortest path is ${path}`
);
