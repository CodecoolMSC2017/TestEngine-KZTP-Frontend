import { Test } from "./Test";
import { User } from "./user";

export class TestReport {
  id:number;
  description:String;
  userDescription:String;
  reporter:User;
  reportedTest:Test;
  solved:boolean;

}
