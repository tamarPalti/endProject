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
                    getColor('success'),
                    getColor('info'),
                    getColor('danger'),
                    getColor('primary'),
                    getColor('secondary'),
                    getColor('success'),
                    getColor('info'),
                    getColor('danger'),
                    getColor('primary'),
                    getColor('secondary'),

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
                        <CardHeader>מספר המשתמשים החדשים בכל חודש</CardHeader>
                        <CardBody>
                            {arrAllUsersByMonth && <Pie data={genPieData(arrAllUsersByMonth)} />}
                        </CardBody>

                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>מספר הנכנסים החדשים בכל חודש למערכת</CardHeader>
                        <CardBody>
                            {arrAllUsersByMonth && arrAllBusinessByMonth && <Bar data={genLineData(arrAllUsersByMonth, arrAllBusinessByMonth)} />}
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>מספר העסקים החדשים בכל חודש</CardHeader>
                        <CardBody>
                            {arrAllBusinessByMonth && <Pie data={genPieData(arrAllBusinessByMonth)} />}
                        </CardBody>

                    </Card>
                </Col>


            </Row>

            <Row>
              
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>מספר העסקים שחופשו בכל חודש</CardHeader>
                        <CardBody>
                            {arrAllSearchBusinessByMonth && <Pie data={genPieData(arrAllSearchBusinessByMonth)} />}
                        </CardBody>

                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>מספר החיפושים בכל חודש</CardHeader>
                        <CardBody>
                            {arrAllSearchBusinessByMonth && arrAllSearchUsersByMonth && <Bar
                                data={genLineData(arrAllSearchUsersByMonth, arrAllSearchBusinessByMonth)}
                            />}
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={4} lg={12} md={12}>
                    <Card>
                        <CardHeader>מספר המשתמשים שחופשו בכל חודש</CardHeader>
                        <CardBody>
                            {arrAllSearchUsersByMonth && <Pie data={genPieData(arrAllSearchUsersByMonth)} />}
                        </CardBody>

                    </Card>
                </Col>

            </Row>

            <Row>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <CardHeader>דיאגרמת מספר הנכנסים בכל חודש למערכת</CardHeader>
                        <CardBody>
                            {arrAllUsersByMonth && arrAllBusinessByMonth && <Line data={genLineData(arrAllUsersByMonth, { type: 'line', fill: false })} />}
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <CardHeader>דיאגרמת מספר החיפושים בכל חודש</CardHeader>
                        <CardBody>
                            {arrAllSearchBusinessByMonth && arrAllSearchUsersByMonth && <Bar data={genLineData(arrAllSearchUsersByMonth, arrAllSearchBusinessByMonth, { type: 'line', fill: false })} />}

                        </CardBody>
                    </Card>
                </Col>

            </Row>

            <Row>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <CardHeader>Polar</CardHeader>
                        <CardBody>
                            {arrAllUsersByMonth && <Polar data={genPieData(arrAllUsersByMonth)} />}
                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <CardHeader>Radar</CardHeader>
                        <CardBody>
                            {arrAllUsersByMonth && arrAllBusinessByMonth && <Radar data={genLineData(arrAllUsersByMonth, arrAllBusinessByMonth)} />}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    );
};

export default ChartPage;
