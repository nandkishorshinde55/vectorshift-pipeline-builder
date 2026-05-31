# VectorShift Pipeline Builder

A modern workflow/pipeline builder built using React Flow, React, Zustand, Tailwind CSS, and FastAPI.

## Live Features

### Part 1: Node Abstraction

To eliminate duplicated node code, I implemented a reusable node architecture.

### Architecture

* BaseNode
* NodeField
* nodeConfigs
* TextNode (custom behavior)

New nodes can be added by configuration rather than creating entirely new components.

### Additional Nodes Added

* Vector Query
* Data Loader
* Chat Memory
* Merge
* Split Text

This approach significantly improves maintainability and scalability.

---

## Part 2: Styling

The application was redesigned using Tailwind CSS with inspiration from VectorShift's workflow builder.

### Improvements

* Modern node cards
* Responsive layout
* Grouped node toolbar
* Consistent spacing
* Hover states
* Gradient node headers
* Better workflow visualization

---

## Part 3: Dynamic Text Node

The Text Node supports variable interpolation using:

```txt
{{ variable }}
```

Example:

```txt
Hello {{ input }}
```

### Features

* Dynamic node resizing
* Dynamic textarea height
* Variable detection using RegEx
* Dynamic React Flow handles
* Duplicate variable prevention
* Multiple variable support

Example:

```txt
{{ firstName }}
{{ lastName }}
```

### Auto Connection Enhancement

If an Input Node already exists with the same variable name, the Text Node automatically creates a connection.

Example:

Input Node:

```txt
input
```

Text Node:

```txt
{{ input }}
```

Connection:

```txt
Input → Text
```

Removing the variable automatically removes the generated connection.

---

## Part 4: Backend Integration

The frontend submits the current pipeline to FastAPI.

### Endpoint

```http
POST /pipelines/parse
```

### Request

```json
{
  "nodes": [],
  "edges": []
}
```

### Response

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

### DAG Validation

Implemented using Kahn's Topological Sort Algorithm.

Complexity:

```txt
O(V + E)
```

---

## Project Structure

```txt
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── constants/
│   ├── nodes/
│   ├── store/
│   ├── utils/
│   ├── App.js
│   ├── toolbar.js
│   ├── ui.js
│   └── submit.js
│
backend/
│
├── main.py
└── requirements.txt
```

---

## Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm start
```

Frontend:

```txt
http://localhost:3000
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python3 -m venv venv
```

Activate:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
python3 -m pip install -r requirements.txt
```

Run backend:

```bash
python3 -m uvicorn main:app --reload
```

Backend:

```txt
http://localhost:8000
```

Swagger:

```txt
http://localhost:8000/docs
```

---

## Technologies

### Frontend

* React
* React Flow
* Zustand
* Tailwind CSS

### Backend

* FastAPI
* Python

### Algorithms

* Kahn's Topological Sort

---

## Design Decisions

### Why BaseNode?

The original implementation duplicated structure across nodes.

BaseNode centralizes:

* Layout
* Styling
* Handles
* Form rendering

which reduces maintenance cost and improves scalability.

### Why Separate TextNode?

TextNode contains custom logic:

* Variable extraction
* Dynamic handles
* Auto connections
* Dynamic resizing

Keeping it separate maintains Single Responsibility Principle.

---

## Author

Nandkishor Shinde

GitHub Repository:

https://github.com/nandkishorshinde55/vectorshift-pipeline-builder
