import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Editor from '@/components/AdvancedEditor/editor/advanced-editor';

const TextEditor = ({ label, name }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    {
                    label && 
                    <label htmlFor={name} className='block text-lg mb-2 text-center font-bold text-black'>
                        <span className={`text-gray-700 dark:text-gray-400 ${error?.message ? 'text-red-500' : ''}`}>{label} {error?.message ? `(${error?.message })`:'' }</span>
                    </label>
                    }
                    
                    <Editor
                    initialValue={field?.value}
                    onChange={(value)=>field.onChange(value)}
                    error={error?.message || false}
                    //     error={error}
                    //    editorContent={getValues("content")}
                    //     getEditorContent={(content) => field?.onChange(content)}
                    />
                </>
            )}
        />
    );
}

export default TextEditor;
