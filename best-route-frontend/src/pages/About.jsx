import { useState } from 'react'
import { Card, CardBody, Switch } from '@nextui-org/react'

const About = () => {
  const [isEnglish, setIsEnglish] = useState(true)

  const toggleLanguage = () => {
    setIsEnglish((prevIsEnglish) => !prevIsEnglish)
  }

  const texts = [
    {
      title: {
        en: 'Route Generation Algorithm:',
        pt: 'Algoritmo de geração de rotas:'
      },
      body: {
        en: 'I developed a route sorting algorithm that prioritizes the highest accuracy of results, rather than processing speed to the detriment of accuracy, which would be more suitable for large datasets. The algorithm used is based on KNN but always takes the accuracy variable to the highest possible value.',
        pt: 'Desenvolvi um algoritmo de ordenação de rotas que prioriza sempre a maior precisão dos resultados, ao invés da velocidade de processamento em detrimento da precisão que seria mais indicado para grandes datasets. O algoritmo utilizado é baseado no KNN, porém leva a variável de precisão sempre para o maior valor possível.'
      }
    },
    {
      title: {
        en: 'Programming Language:',
        pt: 'Linguagem de programação:'
      },
      body: {
        en: 'I chose to develop both the backend and frontend using only JavaScript, aiming for development speed while maintaining code quality. I have also worked with TypeScript and could have done the typing, but considering the context of the small-scale project, I opted for the simpler approach.',
        pt: 'Escolhi desenvolver tanto o backend quanto o frontend utilizando apenas JavaScript, visando o tempo de desenvolvimento, mas mantendo a qualidade do código. Também já trabalhei com TypeScript e poderia ter feito a tipagem, mas analisando o contexto do projeto de pequeno porte, optei pela abordagem mais simples.'
      }
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Switch language*/}
      <Switch
        defaultChecked={isEnglish}
        onChange={toggleLanguage}
        color="secondary"
      >
        {isEnglish ? 'en' : 'pt-br'}
      </Switch>
      {/* Line 1: h1 */}
      <div>
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
          About project.
        </h1>
      </div>

      {/* Line 2: Cards */}
      <div className="mt-8 grid grid-cols-1 gap-8">
        {texts.map((text) => (
          <Card
            key={isEnglish ? text.title.en : text.title.pt}
            className="lg:w-2/3 sm:w-90 mx-auto"
          >
            <CardBody>
              <h1 className="text-1xl font-bold bg-clip-text">
                {isEnglish ? text.title.en : text.title.pt}
              </h1>
              <p>{isEnglish ? text.body.en : text.body.pt}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default About
