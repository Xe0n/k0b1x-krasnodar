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
            <CardTitle>Загрузите ваш файл для старта переобучения модели 🚀</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>Мы ожидаем от вас формат .parquet</CardText>
            <FileUploaderRetrain/>
          </CardBody>
        </Card>  
      </div>
    );
 
  
};

export default Retrain;
