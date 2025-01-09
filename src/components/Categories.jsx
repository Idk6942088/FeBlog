import React from "react";
import { useContext } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { CategContext } from "../context/CategContext";

export const Categories = ({selCateg,setSelCateg}) => {
    const {categories} = useContext(CategContext)

    const handleChange = (event) => {
        const {value,checked} = event.target
        setSelCateg(prev=> checked ? [...prev,value] : prev.filter(categ=>categ!=value))
    }
    
    return (
        <div>
            
                {categories && categories.map(obj=>
                    <FormGroup check inline key={obj.name}>
                        <Input id="checkbox2" value={obj.name} type="checkbox" onChange={handleChange} checked={selCateg.includes(obj.name)} />
                        <Label check>{obj.name}</Label>
                    </FormGroup>
                )}
            
        </div>
    );
};
