import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const GraficoTortaMes = () => {
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const months = [
        { value: 1, label: "Enero" },
        { value: 2, label: "Febrero" },
        { value: 3, label: "Marzo" },
        { value: 4, label: "Abril" },
        { value: 5, label: "Mayo" },
        { value: 6, label: "Junio" },
        { value: 7, label: "Julio" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Septiembre" },
        { value: 10, label: "Octubre" },
        { value: 11, label: "Noviembre" },
        { value: 12, label: "Diciembre" }
    ];
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/obtener-datos-grafico-torta-mes/?month=${selectedMonth}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedMonth]);

    const colors = [
        "#e67e22",
        "#2dc0b7",
        "#bb8fce",
        "#58d68d",
        "#5499c7",
        "#f4d03f",
    ];

    const colorMap = {
        'peluqueria': "#e67e22",
        'psicologia': "#2dc0b7",
        'kinesiologia': "#bb8fce",
        'fonoaudiologia': "#58d68d",
        'podologia': "#5499c7",
        'asesoria juridica': "#f4d03f",
    };

    const renderTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <p>{`Solicitud: ${payload[0].payload.t_consulta || 'Sin dato'}`}</p>
                    <p>{`Cantidad de Solicitudes: ${payload[0].payload.cantidad || 0}`}</p>
                </div>
            );
        }
        return null;
    };

    const legendData = data.map((entry, index) => ({
        value: entry.t_consulta || 'sin datos',
        color: colorMap[entry.t_consulta] || colors[index % colors.length],
    }));

    return (
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg my-5">
            <p className="text-xl font-semibold text-gray-800 mb-4">Gráfico de solicitudes por mes</p>
            
            <div className="mb-4">
                <label htmlFor="month" className="mr-2">Selecciona el mes:</label>
                <select
                    id="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border rounded"
                >
                    {months.map(month => (
                        <option key={month.value} value={month.value}>
                            {month.label} del {new Date().getFullYear()}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            dataKey="cantidad"
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#34495e"
                        >
                            {data.map((entry, index) => {
                                const color = colorMap[entry.t_consulta.toLowerCase()];
                                return <Cell key={`cell-${index}`} fill={color} />;
                            })}
                        </Pie>
                        <Legend
                            layout="horizontal"
                            align="right"
                            verticalAlign="top"
                            wrapperStyle={{ padding: 10, marginTop: '20px' }}
                            iconType="circle"
                            iconSize={10}
                            payload={legendData}
                        />
                        <Tooltip content={renderTooltip} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default GraficoTortaMes;
