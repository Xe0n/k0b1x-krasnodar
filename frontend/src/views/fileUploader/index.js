// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, Button, ListGroup, ListGroupItem, Form, Progress, Spinner } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import axios from 'axios'
import toast from 'react-hot-toast'

const FileUploaderSingle = ({setResponseData, setReady, progress, setProgress}) => {
  // ** State
  const [files, setFiles] = useState([])
  const [result, setResult] = useState({})
    

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'video/mp4': [],
      'video/quicktime': []
    },
    onDrop: acceptedFiles => {
        // Фильтруем только MP4 и MOV файлы
        const validVideoFiles = acceptedFiles.filter(file => {
            return ['video/mp4', 'video/quicktime'].includes(file.type);
        });

        // Обрабатываем только MP4 и MOV файлы
        setFiles(validVideoFiles.map(file => Object.assign(file)));
    }
})
  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }
  const ShowNotion = () => {
    toast.success('Видео получено, начинаем обработку кадров', {
        duration: 5000
    })
  }
  const ShowFinal = () => {
    toast.success('Обработка кадров завершена', {
        duration: 5000
    })
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }
  const scrollTo = () => {window.scrollTo(0, 1000)}
  const extractFramesFromVideo = async (videoFile, numFrames) => {
    const video = document.createElement('video')
    video.src = URL.createObjectURL(videoFile)
  
    // Wait for the 'loadedmetadata' event before accessing video properties
    await new Promise(resolve => {
      video.addEventListener('loadedmetadata', resolve)
    })
    console.log(video.duration)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    const frames = []
    const totalDuration = video.duration * 1000
    const interval = totalDuration / numFrames
 
    console.log('кол-во изучаемых кадров', interval)
    const targetWidth = 640
    for (let i = 0; i < numFrames; i++) {
        const currentTime = i * interval / 1000
  
        video.currentTime = currentTime
  
      // Wait for the 'seeked' event
      await new Promise(resolve => {
        video.addEventListener('seeked', resolve)
      })
  
      canvas.width = targetWidth
      canvas.height = (targetWidth / video.videoWidth) * video.videoHeight
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
  
      const frameBlob = await new Promise(resolve => canvas.toBlob(resolve))
      const frameFile = new File([frameBlob], `frame_${i}.png`)
  
      frames.push(frameFile)
    }
  
    return frames
  }
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
  
      reader.onload = () => {
        resolve(reader.result.split(',')[1]) // Get the base64 part of the result
      }
  
      reader.onerror = (error) => {
        reject(error)
      }
  
      reader.readAsDataURL(file)
    })
  }
  const handleSubmit = async () => {
    setResponseData([])
    if (files.length > 0) {
    console.log(files[0])
    //Кол-во обрабатываемых кадров
      const videoFrames = await extractFramesFromVideo(files[0], 10)

      setProgress(1)
  
      const makeRequests = async () => {
        for (const frame of videoFrames) {
          try {
            const base64Image = await fileToBase64(frame)
            
            const response = await axios({
                method: "POST",
                // url: "https://detect.roboflow.com/bad-traders/1",
                url: "https://detect.roboflow.com/item_final_2/2",
                params: {
                  api_key: import.meta.env.VITE_APITOKEN
                },
                data: base64Image,
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              })
      
            console.log(response.data)
      
            setResponseData(prevData => [
              ...prevData,
              {
                image: response.data.image,
                predictions: response.data.predictions,
                picture: frame
              }
            ])
          } catch (error) {
            console.error(error.message)
            // Handle errors if needed
          }
        }
        setProgress(100)
        ShowFinal()
      }
      
      makeRequests()
      setReady(true)
      ShowNotion()
      scrollTo()

    } else {
      console.log('No files selected')
    }
  }
  return (
    
    <Form className='uploadFile' name="uploadFile"  method="POST" encType="multipart/form-data">
    <Card>
      <CardHeader>
    
      </CardHeader>
      <CardBody>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5>Бросьте файл сюда или нажмите "Загрузка"</h5>
            <p className='text-secondary'>
              Перетащите файл или кликните{' '}
              <a href='/' onClick={e => e.preventDefault()}>
                загрузка
              </a>{' '}
              
            </p>
          </div>
        </div>
        {files.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                Удалить
              </Button>
              <Button color='primary' onClick={handleSubmit}>Загрузить файл</Button>
            </div>
          </Fragment>
        ) : null}
        <div className='mt-3'>
          {/* {progress > 0 && progress !== 100 ? <Progress striped value={progress} /> : ' ' } */}
          {progress > 0 && progress < 100 ? 'Идет обработка файла' : ''}
          {progress > 0 && progress < 100 ? <Spinner color='danger' /> : ''}
          {progress === 100  ? 'Обработка завершенна, результаты доступны ниже' : ''}
        </div>
      </CardBody>
    </Card>
    <Card>
        {result.filename}
    </Card>
    </Form>
  )
}

export default FileUploaderSingle
