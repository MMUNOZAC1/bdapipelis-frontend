import React, { useEffect, useState } from 'react';
import { createTipo, getTipos, updateTipo, deleteTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [formValues, setFormValues] = useState({ nombre: '', estado: '', descripcion: '' });
  const [selectedNombre, setSelectedNombre] = useState(null);

  const listarTipos = async () => {
    const resp = await getTipos();
    setTipos(resp.data);
  };

  useEffect(() => {
    listarTipos();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedNombre) {
      await updateTipo(selectedNombre, formValues);
    } else {
      await createTipo(formValues);
    }
    setFormValues({ nombre: '', estado: '', descripcion: '' });
    setSelectedNombre(null);
    listarTipos();
  };

  const handleUpdate = (tipo) => {
    setFormValues({ nombre: tipo.nombre, estado: tipo.estado, descripcion: tipo.descripcion });
    setSelectedNombre(tipo.nombre);
  };

  const handleDelete = async (nombre) => {
    await deleteTipo(nombre);
    listarTipos();
  };

  return (
    <div className="container">
      <h3>Tipos</h3>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={formValues.nombre} onChange={handleChange} placeholder="Nombre" className="form-control mb-2" required />
        <input name="descripcion" value={formValues.descripcion} onChange={handleChange} placeholder="Descripción" className="form-control mb-2" required />
        <select name="estado" value={formValues.estado} onChange={handleChange} className="form-control mb-2" required>
          <option value="">-- Estado --</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button className="btn btn-primary" type="submit">Guardar</button>
      </form>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Creación</th>
            <th>Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((t) => (
            <tr key={t._id}>
              <td>{t.nombre}</td>
              <td>{t.descripcion}</td>
              <td>{t.estado}</td>
              <td>{moment(t.fechaCreacion).format('DD-MM-YYYY')}</td>
              <td>{moment(t.fechaActualizacion).format('DD-MM-YYYY')}</td>
              <td>
                <button onClick={() => handleUpdate(t)} className="btn btn-warning btn-sm me-2">Editar</button>
                <button onClick={() => handleDelete(t.nombre)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};