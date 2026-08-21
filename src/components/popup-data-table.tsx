import type { ReactNode } from "react";

export function PopupDataTable({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <table className="w-full text-sm">
      <tbody className="divide-y divide-border">
        {rows.map((row) => (
          <tr key={row.label}>
            <th className="w-2/5 py-2 pr-3 text-left align-top text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:w-1/3">
              {row.label}
            </th>
            <td className="py-2 align-top text-foreground">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
