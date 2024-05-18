import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const About = () => {
  return (
    <Tabs defaultActiveKey="about" id="fill-tab-example" className="mb-3" fill>
      <Tab eventKey="about" title="서비스 소개">
        서비스 소개 내용
      </Tab>
      <Tab eventKey="mornitoring" title="모니터링">
        모니터링 내용
      </Tab>
      <Tab eventKey="charging" title="과금">
        과금 내용
      </Tab>
      <Tab eventKey="management" title="관리메뉴" disabled>
        관리메뉴 내용
      </Tab>
    </Tabs>
  );
};

export default About;
