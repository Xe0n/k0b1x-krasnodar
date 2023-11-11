import { useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Row,
  Spinner
} from "reactstrap"
import FileUploaderSingle from "./fileUploader/index"
// import serverDown from "../assets/images/office-server.gif"
import RenderImage from "./RenderImage"
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"

const Home = () => {
  const [ready, setReady] = useState(false)
  const [responseData, setResponseData] = useState([])
  const [progress, setProgress] = useState(0)
  const checkresult = (data) => {
    for (const item of data)  {
      if (item.predictions.length > 0) return 
    }
    return (
      <p>
        <b>На видео не обнаружено объектов торговли</b>
      </p>
    )
  }
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Загрузите ваш файл для начала работы 🚀</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>Мы ожидаем от вас видео файл в формате <b>.mp4</b> или <b>.mov</b></CardText>
            <FileUploaderSingle
              responseData={responseData}
              setResponseData={setResponseData}
              setReady={setReady}
              progress={progress}
              setProgress={setProgress}
            />
          </CardBody>
        </Card>
        <Card>
        
          <CardHeader>
            <CardTitle>Результаты обработки 🎯</CardTitle>
          </CardHeader>
          <CardBody>
          <CardText>Видео файл обрабатывается покадрово, список будет дополняться пока крутится спиннер, результаты будут сохранены в базу данных</CardText>
          <Row>
     
          {ready &&
          // eslint-disable-next-line
            responseData.map((item, index) => item.predictions.length !== 0 ? 
              (
                <Col md="6" xs="12" key={index}>
                  <RenderImage responseData={item} key={index} />
                </Col>
              ) : (
                ""
              )
            )}
            {ready && progress > 0 && progress < 100 && (
              
              <Col md="6" xs="12">
                <Card>
                  <Spinner color='danger' />
                </Card>
              </Col>
            )}
            { progress === 100 ? checkresult(responseData) : ''}
            </Row>
            </CardBody>
        </Card>
      </div>
    )
  
    // return (
    //   <>
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Ошибка обращения к серверу =(</CardTitle>
    //       </CardHeader>
    //       <CardBody>
    //         <h5>
    //           Похоже снегурочка выдернула компьютер с бэком из розетки, если вы
    //           хотели посмотреть на работу сервиса пожалуйста свяжитесь с нами и
    //           мы все починим:
    //         </h5>
    //         <ul>
    //           <li>
    //             <a href="https://t.me/gesitnikov">@gesitnikov</a>
    //           </li>
    //           <li>
    //             <a href="https://t.me/artrsv">@artrsv</a>
    //           </li>
    //         </ul>
    //         <div>
    //           <img src={serverDown} alt="" />
    //         </div>
    //       </CardBody>
    //     </Card>
    //   </>
    // )
  }


export default Home
