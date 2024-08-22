import React from 'react';

const DataTable = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((val, i) => (
                            <td key={i}>{val}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
