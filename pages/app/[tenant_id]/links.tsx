import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from "yup"

import Subtitle from "components/Headings/Subtitle"
import Title from "components/Headings/Title"

type NewLinkForm = {
  name: string
  publicName: string
  slug: string
  destination: string
  appLink: string
}

const newLinkSchema = yup.object({
  name: yup.string().required(),
  publicName: yup.string().required(),
  slug: yup.string().required(),
  destination: yup.string().required(),
  appLink: yup.string().required()
}).required()

const Links = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<NewLinkForm>({
    resolver: yupResolver(newLinkSchema)
  })

  const submit: SubmitHandler<NewLinkForm> = (inputs: NewLinkForm) => {
    console.log(inputs)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <Title>Gerenciador de links</Title>
          <Subtitle>Gerenciador de links</Subtitle>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            className={`w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white 
          hover:bg-gray-100 px-4 py-2`}
          >
            Criar link
          </button>
          <button
            type="button"
            className="w-full border text-base font-medium text-black bg-white hover:bg-gray-100 px-4 py-2"
          >
            Criar grupo
          </button>
        </div>
      </div>

      <pre>{JSON.stringify(errors.name?.message)}</pre>
      <form onSubmit={handleSubmit(submit)} className="container w-full mx-auto shadow-md md:w-3/4 mt-8">
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <Subtitle>Criar link</Subtitle>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">
              Identificação
            </h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full 
                    py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none 
                    focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                    placeholder="Nome interno"
                    {...register("name")}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full 
                    py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none
                    focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                    placeholder="Nome público"
                    {...register("publicName")}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="user-info-name"
                    className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full 
                    py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none 
                    focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                    placeholder="Identificador (slug)"
                    {...register("slug")}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">
              Destino
            </h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full 
                    py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none 
                    focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                    placeholder="https://"
                    {...register("destination")}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full 
                    py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none 
                    focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                    placeholder="Link para app"
                    {...register("appLink")}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              className={`py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 
              focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center 
              text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Links