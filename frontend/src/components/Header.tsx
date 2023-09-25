import { TodoStatusType } from "../models";

interface Props {
  status: string;
  count: number;
  bg: string;
}
export const Header = ({ status, count, bg }: Props) => {
  return (
    <div
      className={`${
        status === TodoStatusType.done
          ? "done"
          : status === TodoStatusType.incompleted
          ? "to-do"
          : status === TodoStatusType.progress
          ? "progress"
          : "new"
      } header-list`}
    >
      <div className="status">{status}</div>

      <div className="list-count" style={{ marginLeft: 20 }}>
        {count}
      </div>
    </div>
  );
};
