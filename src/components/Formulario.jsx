import { useState, useEffect } from 'react'
import Error from './error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

    const [datosFormulario, setDatosFormulario ] = useState({
        nombre: '',
        propietario:'',
        email:'',
        fecha:'',
        sintomas:''
    })
    
    const [error, setError] = useState(false)

    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setDatosFormulario({
                nombre: paciente.nombre,
                propietario:paciente.propietario,
                email:paciente.email,
                fecha:paciente.fecha,
                sintomas:paciente.sintomas
            })
        }
    }, [paciente])

    const { nombre, propietario, email, fecha, sintomas } = datosFormulario

    const handleChange =(e)=>{
        
    
        setDatosFormulario({
            ...datosFormulario,
            [e.target.name]: e.target.value
        })
    }
    const generarId=()=>{
        const random = Math.random().toString(36).substr(2)
        const fecha= Date.now().toString(36)
        
        return random+fecha
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        // VALIDACION DEL FORMULARIO
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setError(true)
            return
        }

        setError(false)
        //Objeto de paciente
        const objetoPaciente ={
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas,
        }
        if(paciente.id){
            //EDITANDO REGISTRO
            objetoPaciente.id = paciente.id

            const pacientesActualizados= pacientes.map(pacienteState => 
                pacienteState.id === paciente.id? objetoPaciente : pacienteState
                )

                setPacientes(pacientesActualizados)
                setPaciente({})
        }else{
            objetoPaciente.id= generarId()
           // NUEVO REGISTRO
           setPacientes([
                ...pacientes,
                objetoPaciente
            ])
        }
       
        //reiniciar el form
       setDatosFormulario({
            nombre: '',
            propietario:'',
            email:'',
            fecha:'',
            sintomas:''
        })
    }
    

    return (
        <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>Seguimiento pacientes</h2>
        <p className='text-lg mt-5 text-center mb-10'>
            Añade pacientes y {' '}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>
        <form 
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        >
            {error && 
                // <Error  mensaje={'Todos los cambios son obligatorios'} />
                <Error>Todos los cambios son obligatorios</Error>
            }
            <div className='mb-5'>
                <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>
                    Nombre Mascota
                </label>
                <input 
                    id="mascota"
                    name="nombre"
                    type='text'
                    placeholder='Nombre de la mascota'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={nombre}
                    onChange={handleChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>
                    Nombre Propietario
                </label>
                <input 
                    id="propietario"
                    name="propietario"
                    type='text'
                    placeholder='Nombre del propietario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={propietario}
                    onChange={handleChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
                Email
                </label>
                <input 
                    id="email"
                    name="email"
                    type='email'
                    placeholder='Email contacto propietario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
                Alta
                </label>
                <input 
                    id="alta"
                    name="fecha"
                    type='date'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={fecha}
                    onChange={handleChange}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
                Síntomas
                </label>
                <textarea 
                    id="sintomas"
                    name="sintomas"
                    placeholder='Describe los síntomas'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={sintomas}
                    onChange={handleChange}
                />
            </div>
            <input 
                type="submit" 
                className='bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                hover:bg-indigo-700 cursor-pointer'
                value={ paciente.id ? 'Editar paciente' : 'Agregar paciente'}
            />
        </form>
        </div>
    )
}

export default Formulario

