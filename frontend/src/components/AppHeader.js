import { SubmitButton } from "./SubmitButton";

export const AppHeader = () => {
  return (
    <header className="z-50 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div>
        <h1 className="text-lg font-bold text-slate-900">
          VectorShift Pipeline Builder
        </h1>
        <p className="text-xs text-slate-500">
          Build, connect and validate AI workflows
        </p>
      </div>

      <SubmitButton />
    </header>
  );
};