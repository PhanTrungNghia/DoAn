import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import {
    Breadcrumb,
    Row,
    Col,
    Space,
    Card,
    Statistic,
    Table,
    Typography
} from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { ReactNode, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { readAllAdminFunctions } from '../../_store/store';
import { title } from 'process';

// Register the components with ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const adminFunctions: IAdminFunction[] = useSelector(
        (state: any) => state.adminFunctionReducer.adminFunctions,
        shallowEqual
    )
    const dispatch = useDispatch<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const labels = adminFunctions.map((af) => {
        return `AdFunc-${af.ID}`
    });

    useEffect(() => {
        setIsLoading(true);
        dispatch(readAllAdminFunctions())
            .then(() => {
                setIsLoading(false); // Set loading to false after the API call is complete
            })
            .catch((error: Error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false); // Set loading to false in case of an error
            });
    }, [adminFunctions, dispatch]);
    return (
        <div className="container">
            <div className="breadcrumb">
                <Row className="ant-row">
                    <Col className="ant-col ant-col-24">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href='/'>Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Danh sách chức năng admin</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
            </div>
            <div className='page-wrapper'>
                <div className='page-head'>
                    <div className='page-title'>
                        Danh sách chức năng admin
                    </div>
                    <div className='page-action'>
                        <button>
                            <span>Thêm mới</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='page-content'>
                <div id='table-scroll' className='table-scroll'>
                    <Space direction='vertical'>
                        {/* <Space direction='horizontal'>
                    <HomeCard
                        title={"Chức năng admin"}
                        value={adminFunctions.length}
                        icon={
                            <AppstoreOutlined
                                style={{
                                    color: "green",
                                    backgroundColor: "rgba(0, 255, 0, 0.25)",
                                    fontSize: 24,
                                    borderRadius: 20,
                                    padding: 8,
                                }}
                            />
                        }
                    />
                </Space> */}
                        <AdminFunctionTableChart
                            dataSource={adminFunctions}
                            isLoading={isLoading}
                            labels={labels}
                        />
                    </Space>
                </div>
            </div>
        </div>
    );
}

function HomeCard({ title, value, icon }: HomeCardProps) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function AdminFunctionTableChart({ dataSource, isLoading, labels }: AdminFunctionTableChartProps) {
    // Define the types for the options and data
    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ chức năng admin',
            },
        },
    };

    const data: ChartData<'bar'> = {
        labels: labels,
        datasets: [
            {
                label: 'Tập dữ liệu 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const [columns, setColumns] = useState<TableColumnType1[]>([]);
    const [dataSourceWithIndex, setDataSourceWithIndex] = useState<IAdminFunctionWithIndex[]>([]);

    // Sử dụng useEffect để ngăn không cho component re-render khi state thay đổi
    // => các hành động thay đổi state được diễn ra chước khi component được render
    useEffect(() => {
        const dataSourceWithIndex: IAdminFunctionWithIndex[] = dataSource.map((item, index) => ({
            ...item,
            INDEX: index + 1,
        }));
        setDataSourceWithIndex(dataSourceWithIndex);
        const firstObject = dataSourceWithIndex[0] || {};
        console.log(firstObject);
        const cols: TableColumnType1[] = [];
        for (const key in firstObject) {
            const col: TableColumnType1 = {
                title: key,
                dataIndex: key,
            };
            cols.push(col);
        }
        console.log(cols);
        setColumns(cols);
    }, [dataSource]); // Chỉ cập nhật columns khi dataSource thay đổi

    return (
        <>
            <Space direction='vertical'>
                <Typography.Text>Chức năng admin</Typography.Text>
                <Table
                    columns={columns}
                    loading={isLoading}
                    dataSource={dataSourceWithIndex}
                    pagination={{
                        pageSize: 10,
                    }}
                    scroll={{ y: 500 }}
                >
                </Table>
                {/* <BarChart options={options} data={data} /> */}
            </Space>
        </>
    )
}

function BarChart({ options, data }: BarChartType) {
    return (
        <Card style={{ width: 700, height: 300 }}>
            <Bar options={options} data={data} />;
        </Card>
    )
}

export default Home;