import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
import FileUploaderRetrain from './fileUploader/retrain'
import DataTablesBasic from './table/DataTableBasic'
import axios from 'axios'
import serverDown from '../assets/images/office-server.gif'

const Retrain = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorAxios, setErorrAxios] = useState('')

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Переобучение модели 🚀</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>В MVP версии переобучение выполняется на нашей стороне на основе ваших откликов на результаты работы модели</CardText>
          </CardBody>
        </Card>  
      </div>
    );
 
  
};

export default Retrain;
