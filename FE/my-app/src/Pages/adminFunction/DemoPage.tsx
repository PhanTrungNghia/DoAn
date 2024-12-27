// Import các thư viện cần thiết
import React from 'react';
import { Menu, Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined, LogoutOutlined, LockOutlined } from '@ant-design/icons';

export const Demo: React.FC = () => {
  // Menu dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LockOutlined />}>
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} danger>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f5f5f5' }}>
      {/* Hiển thị thời gian */}
      <div>
        <span>15:37:56 | 12/12/2024</span>
      </div>

      {/* Khu vực avatar và menu */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Icon thông báo */}
        <Badge count={88} overflowCount={99} style={{ marginRight: 20 }}>
          <i className="anticon anticon-bell" style={{ fontSize: 20 }}></i>
        </Badge>

        {/* Dropdown menu */}
        <Dropdown overlay={menu} placement="bottomRight">
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar size="large" icon={<UserOutlined />} style={{ marginRight: 10 }} />
            <div>
              <strong>ADMIN</strong>
              <div style={{ fontSize: '12px', color: '#888' }}>Administrator</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
