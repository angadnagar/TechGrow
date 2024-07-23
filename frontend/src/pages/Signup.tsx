import { FormComp } from "../components/FormComp"
import { Quote } from "../components/Quote"

export const Signup = ()=>{
  return <div className="bg-gray-100 grid grid-cols-1 lg:grid-cols-2">
    <div className="hidden lg:block">
    <Quote/>
    </div>
    <div>

        <FormComp type="signup"/>

    </div>
  </div>
}