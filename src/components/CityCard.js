import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { MdRefresh } from 'react-icons/md';

const CityCard = ({ city, onRefresh }) => {
  const { name, main: { temp }, weather } = city;
  const { description, icon } = weather[0]
  return (
    <Col xs={12} sm={6} md={4} lg={2}>
      <Card className='weather-card'>
        <CardBody className='d-flex flex-column h-100'>
          <h4>{name}</h4>
          <div className='flex-1' />
          <h2>{Math.round(temp)}&#8451;</h2>
          <div><img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} /></div>
          <div className='c-pointer' onClick={onRefresh}><MdRefresh size={24}/></div>
        </CardBody>
      </Card>
    </Col>
  );
}
 
export default CityCard;
