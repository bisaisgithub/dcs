import './Exam.css';
import t18 from './18.png'
import t17 from './17.png'

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
                <select>
                    <option>TLT</option>
                </select>
                <select>
                    <option>TLT</option>
                </select>   
                 <img src={t18}/>
                 <span>18</span>
            </div>
            <div>
                <select>
                    <option>TLT</option>
                </select>
                <select>
                    <option>TLT</option>
                </select>   
                 <img src={t17}/>
                 <span>18</span>
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