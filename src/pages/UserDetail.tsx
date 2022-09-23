import React, { useEffect, useState } from "react";
import { Form, Table } from "antd";
import { useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { fetchUser, fetchUserByUuid } from "../services/api/userApi";
import useUserColumns from "../hooks/useUserColumns";
import { User, UserByUuid, FilteredUser } from "../types";
import { fetchAccountsByUserId } from "../services/api/accountApi";

function UserDetail() {
  const location = useLocation();
  const { pathname } = location;
  const userId = Number(pathname.split("/")[2]);
  const [user, setUser] = useState<FilteredUser[]>([]);
  const [form] = Form.useForm();
  const [accountNum, setAccountNum] = useState(0);
  const [userByUuid, setUserByUuid] = useState<UserByUuid[]>([]);
  const uuid = user[0]?.uuid || "undefined";

  const userColumns = useUserColumns("detail");

  useEffect(() => {
    fetchAccountsByUserId(userId)
      .then((res) => {
        setAccountNum(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchUser()
      .then((res) => {
        const filteredData = res.data.filter(
          (data: User) => data.id === Number(userId)
        );
        const allowMarketingPush = userByUuid[0]?.allow_marketing_push;
        const isActive = userByUuid[0]?.is_active;
        setUser([
          {
            ...filteredData[0],
            account_count: accountNum,
            allow_marketing_push: allowMarketingPush,
            is_active: isActive,
          },
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [accountNum, userByUuid, userId]);

  useEffect(() => {
    fetchUserByUuid(uuid)
      .then((res) => {
        setUserByUuid(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [uuid]);

  return (
    <PageLayout>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={user}
          columns={userColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </PageLayout>
  );
}

export default UserDetail;