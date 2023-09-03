import React, { useState } from 'react';

function AutoFocusInputFields() {
    const [code, setCode] = useState(''); // State to hold the code input value

    return (
        <div>
            {_.range(6).map((i) => (
                <AutoFocusInputFields key={i} index={i} code={code} setCode={setCode} />
            ))}
        </div>
    );
}

export default AutoFocusInputFields;