import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { AppHeader } from "./components/AppHeader";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col bg-slate-50">
       <AppHeader />

      <PipelineToolbar />

      <div className="min-h-0 flex-1">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
