import React, { useEffect } from 'react';
import DonativoService from '../services/DonativoService';
import CategioriaService from '../services/CategioriaService';
import ColeccionService from '../services/ColeccionService';
import DonadorService from '../services/DonadorService';
import Cabecera from '../components/ui/Cabecera';
import DonativoForm from '../components/ui/DonativoForm';
import { useNavigate } from 'react-router-dom';
import { HiPlusCircle } from 'react-icons/hi';
import { Table, Button, Modal, Form } from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'

const Donativo = () => {
 
    const donativoService = new DonativoService();
    const categoriaService = new CategioriaService();
    const collecionService = new ColeccionService();
    const donadorService = new DonadorService();

    const [donativos, setDonativos] = React.useState([]);
    const [categorias, setCategorias] = React.useState([]);
    const [colleciones, setColeccion] = React.useState([]);
    const [donadores, setDonadores] = React.useState([]);

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [donadorId, setdonadorId] = React.useState(null);
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const [widthpanel, setWidthpanel] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resDonativo = await donativoService.getAll();
                const donadorNum = asignarNumeros(resDonativo.data);
                setDonativos(donadorNum);

                const resCateg = await categoriaService.getAll();
                setCategorias(resCateg.data); 
                const resColeccon = await collecionService.getAll();
                setColeccion(resColeccon.data);
                const resDonador = await donadorService.getAll();
                setDonadores(resDonador.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        fetchData();
        const handleWindowResize = () => {
            setWidthpanel(window.innerWidth > 800);
        };

        window.addEventListener('resize', handleWindowResize);
        handleWindowResize();
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const columnas = [
        {
            title: 'N°',
            dataIndex: 'numero',
            fixed: widthpanel ? 'left' : 'none',
            width: '10%',
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            width: '20%',
            render: (categoria) => categoria.descripcion,
        },
        {
            title: 'Donador',
            dataIndex: 'donador',
            render: (donador) => (donador.nombre + " " + donador.apellidos),
            width: '45%',
        },
        {
            title: 'Coleccion',
            dataIndex: 'coleccion',
            render: (coleccion) => coleccion.nombre,
            width: '45%',
        },
        {
            title: 'Descripcion',
            dataIndex: 'descripcion',
            width: '45%',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            width: '20%',
        },
        
        {
            title: 'Logistica',
            dataIndex: 'logistica',
            width: '20%',
        },
        {
            title: 'Hora',
            dataIndex: 'hora',
            width: '20%',
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            width: '20%',
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            fixed: widthpanel ? 'right' : 'none',
            width: '40%',
            render: (text, record) => (
                <div className='flex gap-1'>
                    <Button className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded" onClick={() => handleEdit(record.id)}>Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded" onClick={() => handleDelete(record.id)}>Eliminar</Button>
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={() => handleEstados(record.id)}>Estados</Button>
                </div>
            ),
        },
    ];
    const asignarNumeros = (obj) => {
        return obj.map((data, index) => ({
            ...data,
            numero: index + 1,
        }));
    };

    const handleOk = async () => {
        try {
            let values = await form.validateFields(); 
            let response;
            if (donadorId === null) {
                response = await donativoService.create(values);
                const nuevo = [...donativos, response.data];
                setDonativos(asignarNumeros(nuevo));
                toast.success('Donativo ha sido creada');
            } else {
                response = await donativoService.update(donadorId, values);
                const actualizado = donativos.map(data => {
                    if (data.id === donadorId) {
                        return { ...data, ...response.data };
                    }
                    return data;
                });
                setDonativos(asignarNumeros(actualizado));
                toast.success('Donativo ha sido actualizada');
            }
            setIsModalVisible(false);
            setdonadorId(null);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setErrors(fieldErrors);
            } else {
                toast.error(error.message === "Failed to fetch" ? 'El servidor no se encuentra o está apagado' : 'Error del servidor');
            }
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleNuevo = () => {
        form.resetFields();
        setdonadorId(null);
        setIsModalVisible(true);
    };
    const handleEdit = (id) => {
        const dataEdit = donativos.find(data => data.id === id);
        if (dataEdit) {
            form.setFieldsValue({
                id_categoria: dataEdit.id_categoria,
                id_donador: dataEdit.id_donador,
                id_coleccion: dataEdit.id_coleccion, 
                descripcion: dataEdit.descripcion,
                cantidad: dataEdit.cantidad,
                logistica: dataEdit.logistica,
                hora: dataEdit.hora,
                fecha: dataEdit.fecha,
            });
            setdonadorId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await donativoService.delete(id);
            setDonadores(donadores => asignarNumeros(donadores.filter(data => data.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const handleEstados = (id) => { 
        navigate(`/estados/${id}`);
    };
    return (
        <>
            <Cabecera titulo="Lista de donativos">
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>
            </Cabecera>
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={donativos} rowKey={record => record.id} scroll={{ x: 1800, }} />
            </div>
            <Modal title="Detalle de donador" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1200}>
                <DonativoForm form={form} listCategorias={categorias} listColecciones={colleciones} listDonadores={donadores} />
            </Modal>
        </>
    );
}

export default Donativo;