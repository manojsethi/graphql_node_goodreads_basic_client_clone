import { Steps } from 'antd'

const ReadingProcessStepper = () => {
  return (
    <div> <Steps className='mt-2'
    progressDot
    current={1}
    direction="vertical"
    items={[
      {
        title: '',
        description: 'March 28, 2023 – Started Reading',
      },
      {
        title: '',
        description: 'March 28, 2023 – Started Reading',
      },
      {
        title: '',
        description: 'March 28, 2023 – Shelved as: axios',
      },
      {
        title: '',
        description: 'April 2, 2023 – Finished Reading',
      },
      {
        title: '',
        description: 'April 3, 2023 – Shelved as: to-read',
      },
    ]}
  /></div>
  )
}

export default ReadingProcessStepper