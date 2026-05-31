export const NodeField = ({ field, value, onChange }) => {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-500">
        {field.label}
      </span>

      {field.type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      )}
    </label>
  );
};