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


const Exam = ({
    is_exam_open, 
    // set_is_exam_open
})=>{
    if (!is_exam_open) {
        return null;
    }
    return (
        <div className='exam-container'>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t18} alt='18'/>
                <span>18</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t17} alt='17'/>
                <span>17</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t16} alt='16'/>
                <span>16</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t15} alt='15'/>
                <span>15</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t14} alt='14'/>
                <span>14</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t13} alt='13'/>
                <span>13</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t12} alt='12'/>
                <span>12</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t11} alt='11'/>
                <span>11</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t21} alt='21'/>
                <span>21</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t22} alt='22'/>
                <span>22</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t23} alt='23'/>
                <span>23</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t24} alt='24'/>
                <span>24</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t25} alt='25'/>
                <span>25</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t26} alt='26'/>
                <span>26</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t27} alt='27'/>
                <span>27</span>
            </div>
            <div>
                <div>
                    <select>
                        <option>ZZ</option>
                    </select>
                    <select>
                        <option>ZZ</option>
                    </select> 
                </div>
                <img src={t28} alt='28'/>
                <span>28</span>
            </div>
            
            {/* <table className='exam-table'>
                <tbody>
                    <tr>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <img src={t18}/>
                        </td>
                        <td>
                            <img src={t17}/>
                        </td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>18</td>
                        <td>17</td>
                        <td>16</td>
                        <td>15</td>
                        <td>14</td>
                        <td>13</td>
                        <td>12</td>
                        <td>11</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
        
    );
}

export default Exam;