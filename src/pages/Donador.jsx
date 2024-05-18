import React, { useEffect } from 'react';
import DonadorService from '../services/DonadorService';
import GrupoService from '../services/GrupoService';
import TipoService from '../services/TipoService';
import Cabecera from '../components/ui/Cabecera'; 
import DonadorForm from '../components/ui/DonadorForm';
import { HiPlusCircle } from 'react-icons/hi';
import { Table, Button, Modal, Form } from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'

const Donador = () => {
    const donadorService = new DonadorService();
    const grupoService = new GrupoService();
    const tipoService = new TipoService();
    const [donadores, setDonadores] = React.useState([]);
    const [grupos, setGrupo] = React.useState([]);
    const [tipos, setTipo] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [donadorId, setdonadorId] = React.useState(null);
    const [form] = Form.useForm();

    const [widthpanel, setWidthpanel] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const donadorData = await donadorService.getAll();
                const donadorNum = asignarNumeros(donadorData.data);
                setDonadores(donadorNum);
                const grupoData = await grupoService.getAll();
                setGrupo(grupoData.data); 
                const tipoData = await tipoService.getEstado(1);
                setTipo(tipoData.data);
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
            title: 'Nombre',
            dataIndex: 'nombre',
            width: '45%',
        },
        {
            title: 'Apellidos',
            dataIndex: 'apellidos',
            width: '20%',
        },
        {
            title: 'Grupo',
            dataIndex: 'grupo',
            width: '45%',
            render: (grupo) => grupo.nombre,
        },
        {
            title: 'Tipo donante',
            dataIndex: 'tipo_donante',
            render: (tipoDonante) => tipoDonante.nombre,
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
                data = await donadorService.create(values);
                const nuevasdonadores = [...donadores, data.data];
                setDonadores(asignarNumeros(nuevasdonadores));
                toast.success('Categoría ha sido creada');
            } else {
                data = await donadorService.update(donadorId, values);
                const updateddonadores = donadores.map(donador => {
                    if (donador.id === donadorId) {
                        return { ...donador, ...data.data };
                    }
                    return donador;
                });
                setDonadores(asignarNumeros(updateddonadores));
                toast.success('Categoría ha sido actualizada');
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
        const dataEdit = donadores.find(data => data.id === id);
        if (dataEdit) {
            form.setFieldsValue({
                id_tipo_donante: dataEdit.id_tipo_donante,
                id_grupo: dataEdit.id_grupo,
                nombre: dataEdit.nombre,
                apellidos: dataEdit.apellidos,
                direccion: dataEdit.direccion,
            });
            setdonadorId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await donadorService.delete(id);
            setDonadores(donadores => asignarNumeros(donadores.filter(data => data.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <Cabecera titulo="Lista de donadores">
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>
            </Cabecera>
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={donadores} rowKey={record => record.id} scroll={{ x: 1200, }} />
            </div>
            <Modal title="Detalle de donador" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={516}>
                <DonadorForm form={form} listGrupo={grupos} listTipo={tipos} />
            </Modal>
        </>
    );
}

export default Donador;