import './Exam.css';
import t18 from './18.png'
import t17 from './17.png'
import t16 from './16.png'
import t15 from './15.png'
import t14 from './14.png'
import t13 from './13.png'
import t12 from './12.png'
import t11 from './11.png'
import t21 from './21.png'
import t22 from './22.png'
import t23 from './23.png'
import t24 from './24.png'
import t25 from './25.png'
import t26 from './26.png'
import t27 from './27.png'
import t28 from './28.png'
import t48 from './48.png'
import t47 from './47.png'
import t46 from './46.png'
import t45 from './45.png'
import t44 from './44.png'
import t43 from './43.png'
import t42 from './42.png'
import t41 from './41.png'
import t31 from './31.png'
import t32 from './32.png'
import t33 from './33.png'
import t34 from './34.png'
import t35 from './35.png'
import t36 from './36.png'
import t37 from './37.png'
import t38 from './38.png'


const Exam = ({
    is_exam_open, tooth_check_box, set_tooth_check_box,
    tooth_select, set_tooth_select,
    tooth_remark, set_tooth_remark,
    is_baby_teeth, set_is_baby_teeth,
    // set_is_exam_open
})=>{
    if (!is_exam_open) {
        return '';
    }
    const checkBoxFunction = async (e)=>{
        await set_tooth_check_box((prev)=>{
           let newValue = {...prev}
           newValue[e.target.value] = e.target.checked;
           return newValue;
        })
    }
    console.log('tooth_check_box', tooth_check_box.t18);
    return (
        <div>
            <button className='exam-button' onClick={()=>{set_is_baby_teeth(!is_baby_teeth)}}>Baby Teeth</button>
            {!is_baby_teeth? (
                <div>
                    <div className='exam-container'>
                        <div>
                            <div>
                                <input type='checkbox' value='t18'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t18} />
                                <select value={tooth_remark.t18} name='t18'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t18} alt='18'/>
                            <span>18</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t17'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t17} />
                                <select value={tooth_remark.t17} name='t17'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t17} alt='t17'/>
                            <span>17</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t16'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t16} />
                                <select value={tooth_remark.t16} name='t16'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t16} alt='t16'/>
                            <span>16</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t15'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t15} />
                                <select value={tooth_remark.t15} name='t15'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t15} alt='t15'/>
                            <span>15</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t14'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t14} />
                                <select value={tooth_remark.t14} name='t14'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t14} alt='t14'/>
                            <span>14</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t13'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t13} />
                                <select value={tooth_remark.t13} name='t13'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t13} alt='t13'/>
                            <span>13</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t12'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t12} />
                                <select value={tooth_remark.t12} name='t12'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t12} alt='t12'/>
                            <span>12</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t11'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t11} />
                                <select value={tooth_remark.t11} name='t11'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t11} alt='t11'/>
                            <span>11</span>
                        </div>
                        <div className='border-left'>
                            <div>
                                <input type='checkbox' value='t21'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t21} />
                                <select value={tooth_remark.t21} name='t21'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t21} alt='t21'/>
                            <span>21</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t22'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t22} />
                                <select value={tooth_remark.t22} name='t22'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t22} alt='t22'/>
                            <span>22</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t23'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t23} />
                                <select value={tooth_remark.t23} name='t23'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t23} alt='t23'/>
                            <span>23</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t24'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t24} />
                                <select value={tooth_remark.t24} name='t24'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t24} alt='t24'/>
                            <span>24</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t25'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t25} />
                                <select value={tooth_remark.t25} name='t25'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t25} alt='t25'/>
                            <span>25</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t26'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t26} />
                                <select value={tooth_remark.t26} name='t26'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t26} alt='t26'/>
                            <span>26</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t27'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t27} />
                                <select value={tooth_remark.t27} name='t27'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t27} alt='t27'/>
                            <span>27</span>
                        </div>
                        <div>
                            <div>
                                <input type='checkbox' value='t28'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t28} />
                                <select value={tooth_remark.t28} name='t28'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                            </div>
                            <img src={t28} alt='t28'/>
                            <span>28</span>
                        </div>
                    </div>
                    
                    {/* bottom */}
                    <div className='exam-container'>
                        <div>
                            <span>48</span>
                            <img src={t48} alt='t48'/>
                            <div>
                                
                                <select value={tooth_remark.t48} name='t48'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t48'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t48} />
                            </div>
                        </div>
                        <div>
                            <span>47</span>
                            <img src={t47} alt='t47'/>
                            <div>
                                
                                <select value={tooth_remark.t47} name='t47'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t47'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t47} />
                            </div>
                        </div>
                        <div>
                            <span>46</span>
                            <img src={t46} alt='t46'/>
                            <div>
                                
                                <select value={tooth_remark.t46} name='t46'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t46'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t46} />
                            </div>
                        </div>
                        <div>
                            <span>45</span>
                            <img src={t45} alt='t45'/>
                            <div>
                                
                                <select value={tooth_remark.t45} name='t45'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t45'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t45} />
                            </div>
                        </div>
                        <div>
                            <span>44</span>
                            <img src={t44} alt='t44'/>
                            <div>
                                
                                <select value={tooth_remark.t44} name='t44'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t44'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t44} />
                            </div>
                        </div>
                        <div>
                            <span>43</span>
                            <img src={t43} alt='t43'/>
                            <div>
                                
                                <select value={tooth_remark.t43} name='t43'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t43'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t43} />
                            </div>
                        </div>
                        <div>
                            <span>42</span>
                            <img src={t42} alt='t42'/>
                            <div>
                                
                                <select value={tooth_remark.t42} name='t42'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t42'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t42} />
                            </div>
                        </div>
                        <div>
                            <span>41</span>
                            <img src={t41} alt='t41'/>
                            <div>
                                
                                <select value={tooth_remark.t41} name='t41'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t41'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t41} />
                            </div>
                        </div>
                        <div className='border-left'>
                            <span>31</span>
                            <img src={t31} alt='t31'/>
                            <div>
                                
                                <select value={tooth_remark.t31} name='t31'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t31'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t31} />
                            </div>
                        </div>
                        <div>
                            <span>32</span>
                            <img src={t32} alt='t32'/>
                            <div>
                                
                                <select value={tooth_remark.t32} name='t32'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t32'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t32} />
                            </div>
                        </div>
                        <div>
                            <span>33</span>
                            <img src={t33} alt='t33'/>
                            <div>
                                
                                <select value={tooth_remark.t33} name='t33'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t33'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t33} />
                            </div>
                        </div>
                        <div>
                            <span>34</span>
                            <img src={t34} alt='t34'/>
                            <div>
                                
                                <select value={tooth_remark.t34} name='t34'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t34'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t34} />
                            </div>
                        </div>
                        <div>
                            <span>35</span>
                            <img src={t35} alt='t35'/>
                            <div>
                                
                                <select value={tooth_remark.t35} name='t35'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t35'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t35} />
                            </div>
                        </div>
                        <div>
                            <span>36</span>
                            <img src={t36} alt='t36'/>
                            <div>
                                
                                <select value={tooth_remark.t36} name='t36'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t36'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t36} />
                            </div>
                        </div>
                        <div>
                            <span>37</span>
                            <img src={t37} alt='t37'/>
                            <div>
                                
                                <select value={tooth_remark.t37} name='t37'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t37'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t37} />
                            </div>
                        </div>
                        <div>
                            <span>38</span>
                            <img src={t38} alt='t38'/>
                            <div>
                                
                                <select value={tooth_remark.t38} name='t38'
                                    onChange={(e)=>{
                                            set_tooth_remark((prev)=>{
                                                let newValue = {...prev}
                                                newValue[e.target.name] = e.target.value;
                                                return newValue;
                                            })
                                        }}>
                                    {
                                        tooth_select.map((select, index)=>{
                                            return (<option key={index} value={select}>{select}</option>);
                                        })
                                    }
                                    <option value={''}></option>
                                </select>
                                <input type='checkbox' value='t38'onChange={(e)=>{checkBoxFunction(e)}} checked={tooth_check_box.t38} />
                            </div>
                        </div>        
                    </div>
                </div>
            ):(
                'TEST'
            )}
                
            
        </div>
        
    );
}

export default Exam;