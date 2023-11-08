import React, { Fragment, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from "axios";

import Loading from "../constants/Loading";

const Statistiques = () =>{
  
const [loading, setLoading] = useState(true);
const [membresFIMPISAVA, setMembresFimpisava] = useState(0);
const [district_sambava, setSAMBAVA] = useState(0);
const [district_antalaha, setANTALAHA] = useState(0);
const [district_vohemar, setVOHEMAR] = useState(0);
const [district_andapa, setANDAPA] = useState(0);

useEffect(() =>{

  axios.get(`api/statistiques`).then(res =>{
    console.log(res.data.MembreFIMPISAVA);
      if(res.data.status === 200){
        setMembresFimpisava(res.data.membresFIMPISAVA)
        setSAMBAVA(res.data.sambava);
        setANTALAHA(res.data.antalaha);
        setVOHEMAR(res.data.vohemar);
        setANDAPA(res.data.andapa);
       }
       setLoading(false);
   });
},[]);

if(loading){
  return <Loading/>
}

const data = [
  { name: 'Groupe A', value:  district_sambava }, // District Antalaha
  { name: 'Groupe B', value:  district_antalaha }, // District Vohemar
  { name: 'Groupe C', value:  district_vohemar }, // District Andapa
  { name: 'Groupe D', value: district_andapa }, // District Sambava
];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];
const COLORS = ['#FFBB28', '#FF8042', '#0088FE', '#00C49F'];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Fragment>
      <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 border-0 rounded-0 mt-2">
                <h3 className="text-center text-success roboto-font my-3">S T A T I S T I Q U E S</h3>
            </div>
        </div>
      </div>
      <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 bg-info border-0 rounded-0 mt-2">
                <h3 className="text-center text-white roboto-font my-3">NOMBRE TOTAL MEMBRES FI.MPI.SAVA</h3>
            </div>
        </div>
      </div>
      <div className="row">
          <div className="col-md-12">
            <div className="card elevation-1 border-0 rounded-0">
                <h3 className="text-center text-muted roboto-font my-3">{membresFIMPISAVA}</h3>
            </div>
        </div>
      </div>

      <div className="row mt-1">
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#FFBB28'}}>
                  <h3 className="text-center roboto-font mt-4 my-3 text-white">SAMBAVA</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{district_sambava}</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#FF8042'}}>
                  <h3 className="text-center roboto-font mt-4 text-white my-3">ANTALAHA</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{district_antalaha}</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#00C49F'}}>
                  <h3 className="text-center roboto-font mt- text-white mt-4 my-3">VOHEMAR</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{district_vohemar}</h1>
              </div>
          </div>
          <div className="col-md-3">
              <div className="card elevation-1 border-0 rounded-0 mt-2" style={{backgroundColor:'#0088FE'}}>
                  <h3 className="text-center roboto-font mt-4 my-3 text-white">ANDAPA</h3>
                  <hr/>
                  <h1 className="text-center roboto-font my-3 text-white">{district_andapa}</h1>
              </div>
          </div>
        </div>

        <div className="mt-2 col-md-12">
          <div className="card elevation-1 border-0 rounded-0 mt-2">
            <ResponsiveContainer width="100%" height={425}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
    </Fragment>
  );
}

export default Statistiques;