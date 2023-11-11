import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";


const Contact = () => {

    return (
    <>
      <Card>
          <CardHeader>
            <CardTitle>Наши контакты</CardTitle>
          </CardHeader>
          <CardBody>
              <h5>Были рады стараться для вас!</h5>
              <ul>
                <li><a href="https://t.me/gesitnikov">@gesitnikov - PM</a></li>
                <li><a href="https://t.me/yudwarrior">@yudwarrior - Бэк</a></li>
                <li><a href="https://t.me/artrsv">@artrsv - Фронт</a></li>
                <li><a href="https://t.me/KsandrVenom">@KsandrVenom - DS </a></li>
              </ul>
          </CardBody>
        </Card>
    </>
    )
};

export default Contact;
