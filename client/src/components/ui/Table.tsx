import type { ReactNode } from "react";

interface Props {
  headers: string[];
  children: ReactNode;
}

export function Table({
  headers,
  children,
}: Props) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}
