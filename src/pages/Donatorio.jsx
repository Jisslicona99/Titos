import React, { useEffect } from 'react';
import DonatorioService from '../services/DonatorioService';
import ColeccionService from '../services/ColeccionService'; 
import Cabecera from '../components/ui/Cabecera';
import DonatorioForm from '../components/ui/DonatorioForm';
import { HiPlusCircle } from 'react-icons/hi';
import { Table, Button, Modal, Form } from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'

const Donatorio = () => {
    const donatorioService = new DonatorioService();
    const coleccionService = new ColeccionService(); 
    const [donatorios, setDonatorios] = React.useState([]);
    const [colecciones, setColeccion] = React.useState([]); 

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [donadorId, setdonadorId] = React.useState(null);
    const [form] = Form.useForm();

    const [widthpanel, setWidthpanel] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const donadorData = await donatorioService.getAll();
                const donadorNum = asignarNumeros(donadorData.data);
                setDonatorios(donadorNum);
                const resColeccion = await coleccionService.getAll();
                setColeccion(resColeccion.data); 
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
            width: '5%',
        },
        {
            title: 'Coleccion',
            dataIndex: 'coleccion',
            width: '45%',
            render: (coleccion) => coleccion.nombre,
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            width: '45%',
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            width: '20%',
        },
        {
            title: 'telefono',
            dataIndex: 'telefono',
            width: '45%', 
        }, 
        {
            title: 'Direccion',
            dataIndex: 'direccion',
            width: '20%',
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            fixed: widthpanel ? 'right' : 'none',
            width: '30%',
            render: (text, record) => (
                <div className='flex gap-1'>
                    <Button className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded" onClick={() => handleEdit(record.id)}>Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded" onClick={() => handleDelete(record.id)}>Eliminar</Button>
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
            values = {
                ...values,
                precio: parseFloat(values.precio),
            };
            let data;
            if (donadorId === null) {
                data = await donatorioService.create(values);
                const nuevasdonatorios = [...donatorios, data.data];
                setDonatorios(asignarNumeros(nuevasdonatorios));
                toast.success('Donatorio ha sido creada');
            } else {
                data = await donatorioService.update(donadorId, values);
                const updateddonatorios = donatorios.map(donador => {
                    if (donador.id === donadorId) {
                        return { ...donador, ...data.data };
                    }
                    return donador;
                });
                setDonatorios(asignarNumeros(updateddonatorios));
                toast.success('Donatorio ha sido actualizada');
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
        const dataEdit = donatorios.find(data => data.id === id);
        if (dataEdit) {
            form.setFieldsValue({
                id_coleccion: dataEdit.id_coleccion, 
                nombre: dataEdit.nombre,
                tipo: dataEdit.tipo,
                telefono: dataEdit.telefono,
                direccion: dataEdit.direccion, 
            });
            setdonadorId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await donatorioService.delete(id);
            setDonatorios(donatorios => asignarNumeros(donatorios.filter(data => data.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <Cabecera titulo="Lista de donatorios">
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>
            </Cabecera>
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={donatorios} rowKey={record => record.id} scroll={{ x: 1200, }} />
            </div>
            <Modal title="Detalle de donador" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={516}>
                <DonatorioForm form={form} listColeccion={colecciones} l  />
            </Modal>
        </>
    );
}

export default Donatorio;