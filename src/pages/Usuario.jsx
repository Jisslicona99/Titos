import React,{useEffect} from 'react';
import AuthService from '../services/AuthService';
import RolService from '../services/RolService';
import Cabecera from '../components/ui/Cabecera';
import UserForm from '../components/ui/UserForm';
import { HiPlusCircle } from 'react-icons/hi';
import { Table, Button, Modal, Form} from 'antd';
import { z } from 'zod';
import { toast } from 'sonner'

const User = () => {
    const [usuarios, setUsuarios] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [usuarioId, setUsuarioId] = React.useState(null);
    const [form] = Form.useForm();
    const authService = new AuthService();
    const roleService = new RolService();
    const [rolesList, setRolesList] = React.useState([]);
    const [widthpanel, setWidthPanel] = React.useState(false);

    useEffect(() => { 
        const fetchData = async () => {
            try { 
                const usuariosData = await authService.getAll();
                const usuariosConNumeros = asignarNumeros(usuariosData.data);
                setUsuarios(usuariosConNumeros); 
                const rolesData = await roleService.getAll();
                setRolesList(rolesData.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        fetchData(); 
        const handleWindowResize = () => {
            setWidthPanel(window.innerWidth > 800);
        };
 
        window.addEventListener('resize', handleWindowResize); 
        handleWindowResize(); 
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const asignarNumeros = (obj) => {
        return obj.map((data, index) => ({
            ...data,
            numero: index + 1,
        }));
    };

    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const columnas = [
        {
            title: 'N°',
            dataIndex: 'numero',
            fixed: widthpanel ? 'left' : 'none',
            width: '5%',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            width: 'auto',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 'auto',
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            fixed: widthpanel ? 'right' : 'none',
            width: '20%',
            render: (text, record) => (
                <div className='flex gap-1'>
                    <Button className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded" onClick={() => handleEdit(record.id)}>Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded" onClick={() => handleDelete(record.id)}>Eliminar</Button>
                </div>
            ),
        },
    ];
    const handleOk = async () => {
        try {
            let values = await form.validateFields();
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'avatar') {
                    if (Array.isArray(value) && value.length > 0) {
                        formData.append('avatar', value[0].originFileObj);
                    }
                } else {
                    formData.append(key, value);
                }
            });
            const response = usuarioId === null ?
                await authService.create(formData) :
                await authService.update(usuarioId, formData);
            if (response.status === true) {
                const updatedUsuarios = usuarioId === null ? [...usuarios, response.data] : usuarios.map(data => data.id === usuarioId ? { ...data, ...response.data } : data);
                setUsuarios(asignarNumeros(updatedUsuarios));
                toast.success(`Usuario ha sido ${usuarioId === null ? 'creada' : 'actualizada'}.`);
                setIsModalVisible(false);
                setUsuarioId(null);
            } else {
                const fieldErrors = Object.entries(response.error).map(([key, errors]) => ({
                    name: key,
                    errors: errors,
                }));
                form.setFields(fieldErrors);
                const errorMessage = Object.values(response.error).flat().join('. ');
                toast.error(`Error al procesar la solicitud: ${errorMessage}`);
            }
        } catch (error) { 
            if (error instanceof z.ZodError) {
                const fieldErrors = {};
                error.errors.forEach(err => fieldErrors[err.path[0]] = err.message);
                setErrors(fieldErrors);
            }
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleNuevo = () => {
        form.resetFields();
        setUsuarioId(null);
        setIsModalVisible(true);
    };
    const handleEdit = (id) => {
        form.resetFields();
        const dataEdit = usuarios.find(categoria => categoria.id === id);
        if (dataEdit) {
            form.setFieldsValue({
                id_rol: dataEdit.id_rol,
                name: dataEdit.name,
                email: dataEdit.email,
            });
            setUsuarioId(id);
            setIsModalVisible(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await authService.delete(id);
            setUsuarios(usuarios => asignarNumeros(usuarios.filter(data => data.id !== id)));
            toast.success(response.status ? 'Eliminado correctamente' : 'Error al eliminar');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <Cabecera titulo="Lista de Usuarios">
                <Button className="bg-blue-500 py-4 px-5 text-white font-bold rounded inline-flex items-center hover:text-blue-700" onClick={() => handleNuevo()}>
                    <span className="hidden sm:inline">Nuevo</span>
                    <HiPlusCircle className="h-4 w-4 ml-1" />
                </Button>
            </Cabecera>
            <div className="bg-white border rounded-lg shadow-md p-2" style={{ overflowX: 'auto' }}>
                <Table columns={columnas} dataSource={usuarios} rowKey={record => record.id} scroll={{ x: 980, }} />
            </div>
            <Modal title="Detalle del Usuario" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={616}>
                <UserForm form={form} rolesList={rolesList} usuarioId={usuarioId} /> 
            </Modal>
        </>
    );
}

export default User;