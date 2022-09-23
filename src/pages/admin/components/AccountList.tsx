import { Spin, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import { useAccountsQuery } from "../../../services/hooks/useAccountsQuery";
import { AccountListProps } from "../../../types/user";
import brokers from "../../../services/static/brokers.json";

const columns: ColumnsType<AccountListProps> = [
  {
    title: "고객명",
    dataIndex: "user_name",
    key: "user_name",
    render: (user_name, record) => (
      <Link to={`/admin/user-list/${record.user_id}`}>{user_name}</Link>
    ),
  },
  {
    title: "브로커명",
    dataIndex: "broker_name",
    key: "broker_name",
    filters: Object.values(brokers).map((e) => ({ text: e, value: e })),
    onFilter: (value, record) => record.broker_name === value,
  },
  {
    title: "계좌번호",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "계좌상태",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "계좌명",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "평가금액",
    dataIndex: "assets",
    key: "assets",
  },
  {
    title: "입금금액",
    dataIndex: "payments",
    key: "payments",
  },
  {
    title: "계좌활성화여부",
    dataIndex: "is_active",
    key: "is_active",
    render: (bool) => (bool ? "예" : "아니오"),
  },
  {
    title: "계좌개설일",
    dataIndex: "created_at",
    key: "created_at",
  },
];

const AccountList = () => {
  const { accountList, isLoading } = useAccountsQuery();

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={accountList}
      rowKey={(row) => row.uuid}
    />
  );
};

export default AccountList;
