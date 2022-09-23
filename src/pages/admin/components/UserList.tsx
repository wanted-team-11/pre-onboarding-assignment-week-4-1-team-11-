import { Button, Pagination, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../router/Router";
import { useUserListQuery } from "../../../services/hooks/useUserListQuery";
import { UserListProps } from "../../../types/user";

const columns: ColumnsType<UserListProps> = [
  {
    title: "고객명",
    dataIndex: "name",
    key: "name",
    render: (name, record) => (
      <Link to={`${PATH.USER_DETAIL(record.id + "")}`}>{name}</Link>
    ),
  },
  {
    title: "보유 계좌",
    dataIndex: "account_count",
    key: "account_count",
  },
  {
    title: "이메일",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "성별코드",
    dataIndex: "gender_origin",
    key: "gender_origin",
  },
  {
    title: "생년월일",
    dataIndex: "birth_date",
    key: "birth_date",
  },
  {
    title: "휴대폰",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "최근로그인",
    dataIndex: "last_login",
    key: "last_login",
  },
  {
    title: "혜택 수신 동의 여부",
    dataIndex: "allow_marketing_push",
    key: "allow_marketing_push",
    render: (bool) => (bool ? "예" : "아니오"),
  },
  {
    title: "활성화 여부",
    dataIndex: "is_active",
    key: "is_active",
    render: (bool) => (bool ? "예" : "아니오"),
    filters: [
      {
        text: "true",
        value: true,
      },
      {
        text: "false",
        value: false,
      },
    ],
    onFilter: (value, record) => record.is_active === value,
  },
  {
    title: "가입일",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "임직원 계좌 여부",
    dataIndex: "is_staff",
    key: "is_staff",
    render: (bool) => (bool ? "예" : "아니오"),
    filters: [
      {
        text: "true",
        value: true,
      },
      {
        text: "false",
        value: false,
      },
    ],
    onFilter: (value, record) => record.is_staff === value,
  },
];

const UserList = () => {
  const { page = "1" } = useParams();
  const { userList, totalUserCount = "0", isLoading } = useUserListQuery(page);
  const navigate = useNavigate();
  return (
    <>
      <Table
        columns={columns}
        dataSource={userList}
        loading={isLoading}
        rowKey={(row) => row.id}
        pagination={false}
      />
      {!isLoading && (
        <Pagination
          total={parseInt(totalUserCount)}
          pageSize={20}
          current={parseInt(page)}
          onChange={(page) => {
            navigate(PATH.USER_LIST(page + ""));
          }}
        />
      )}
    </>
  );
};

export default UserList;
