from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict, List
from collections import defaultdict, deque

app = FastAPI(title="VectorShift Pipeline Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelinePayload(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    node_ids = {node.get("id") for node in nodes}

    graph = defaultdict(list)
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")

        if source in node_ids and target in node_ids:
            graph[source].append(target)
            indegree[target] += 1

    queue = deque([node_id for node_id in node_ids if indegree[node_id] == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbor in graph[current]:
            indegree[neighbor] -= 1

            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)


@app.get("/")
def health_check():
    return {"message": "Backend is running"}


@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload):
    return {
        "num_nodes": len(payload.nodes),
        "num_edges": len(payload.edges),
        "is_dag": is_dag(payload.nodes, payload.edges),
    }
