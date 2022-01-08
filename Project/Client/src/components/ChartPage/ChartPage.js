import React, { useEffect, useState } from 'react';

import { getColor } from './utils/colors';
import { randomNum } from './utils/demos';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';

import Page from './components/Page';


import { GetCountAllUserByMonth, GetCountAllBusinessByMonth, GetCountSearchBusinessByMonth, GetCountSearchUsersByMonth } from '../../util/index';

import './ChartPage.scss';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const genLineData = (arrUsers, arrBusiness, moreData = {}, moreData2 = {}) => {
    return {
        labels: MONTHS,
        datasets: [
            {
                label: 'Users',
                backgroundColor: getColor('primary'),
                borderColor: getColor('primary'),
                borderWidth: 1,
                data: [
                    arrUsers[0],
                    arrUsers[1],
                    arrUsers[2],
                    arrUsers[3],
                    arrUsers[4],
                    arrUsers[5],
                    arrUsers[6],
                    arrUsers[7],
                    arrUsers[8],
                    arrUsers[9],
                    arrUsers[10],
                    arrUsers[11],

                ],
                ...moreData,
            },
            {
                label: 'Business',
                backgroundColor: getColor('secondary'),
                borderColor: getColor('secondary'),
                borderWidth: 1,
                data: [
                    arrBusiness[0],
                    arrBusiness[1],
                    arrBusiness[2],
                    arrBusiness[3],
                    arrBusiness[4],
                    arrBusiness[5],
                    arrBusiness[6],
                    arrBusiness[7],
                    arrBusiness[8],
                    arrBusiness[9],
                    arrBusiness[10],
                    arrBusiness[11],
                ],
                ...moreData2,
            },
        ],
    };
};

const genPieData = (arr) => {
    return {
        datasets: [
            {
                data: [
                    arr[0],
                    arr[1],
                    arr[2],
                    arr[3],
                    arr[4],
                    arr[5],
                    arr[6],
                    arr[7],
                    arr[8],
                    arr[9],
                    arr[10],
                    arr[11],
                ],
                backgroundColor: [
                    getColor('primary'),
                    getColor('secondary'),
                    getColor('indigo'),
                    getColor('orange'),
                    getColor('danger'),
                    getColor('yellow'),
                    getColor('green'),
                    getColor('teal'),
                    getColor('purple'),
                    getColor('gray-dark'),
                    getColor('cyan'),
                    getColor('pink'),

                ],
                label: 'Dataset 1',
            },
        ],
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
};

const ChartPage = () => {






    const [arrAllUsersByMonth, setArrAllUsersByMonth] = useState(null);
    const [arrAllBusinessByMonth, setArrAllBusinessByMonth] = useState(null);
    const [arrAllSearchBusinessByMonth, setArrAllSearchBusinessByMonth] = useState(null);
    const [arrAllSearchUsersByMonth, setArrAllSearchUsersByMonth] = useState(null);


    useEffect(() => {
        GetCountAllUserByMonth().then((succ) => {
            setArrAllUsersByMonth(succ);
        }).catch(err => {
            console.log(err);

        });

        GetCountAllBusinessByMonth().then((succ) => {
            setArrAllBusinessByMonth(succ);
        }).catch(err => {
            console.log(err);

        });
        GetCountSearchBusinessByMonth().then((succ) => {
            setArrAllSearchBusinessByMonth(succ);
        }).catch(err => {
            console.log(err);

        });
        GetCountSearchUsersByMonth().then((succ) => {
            setArrAllSearchUsersByMonth(succ);
        }).catch(err => {
            console.log(err);

        });
    }, [])


    return (
        <Page title="Charts" style={{ "margin-top": "1rem" }} breadcrumbs={[{ name: 'Charts', active: true }]}>
            <Row>

                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>count new users in month</CardHeader>
                        <CardBody>
                            {arrAllUsersByMonth && <Pie data={genPieData(arrAllUsersByMonth)} />}
                        </CardBody>

                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>count new users and business in month</CardHeader>
                        <CardBody>
                            {arrAllUsersByMonth && arrAllBusinessByMonth && <Bar data={genLineData(arrAllUsersByMonth, arrAllBusinessByMonth)} />}
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>count new business in month</CardHeader>
                        <CardBody>
                            {arrAllBusinessByMonth && <Pie data={genPieData(arrAllBusinessByMonth)} />}
                        </CardBody>

                    </Card>
                </Col>


            </Row>

            <Row>
              
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>count business that searched in month</CardHeader>
                        <CardBody>
                            {arrAllSearchBusinessByMonth && <Pie data={genPieData(arrAllSearchBusinessByMonth)} />}
                        </CardBody>

                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>count business and users that searched in month</CardHeader>
                        <CardBody>
                            {arrAllSearchBusinessByMonth && arrAllSearchUsersByMonth && <Bar
                                data={genLineData(arrAllSearchUsersByMonth, arrAllSearchBusinessByMonth)}
                            />}
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>count users that searched in month</CardHeader>
                        <CardBody>
                            {arrAllSearchUsersByMonth && <Pie data={genPieData(arrAllSearchUsersByMonth)} />}
                        </CardBody>

                    </Card>
                </Col>

            </Row>

          
        </Page>
    );
};

export default ChartPage;
