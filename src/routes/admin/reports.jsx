import DailyEarningsReport from "../../components/admin/daily-earnings-report";
import MostSoldReport from "../../components/admin/most-sold-report";

const reports = () => {
  return (
    <section className="flex flex-col items-center w-full px-4 my-8 text-2xl font-semibold text-white">
      <h1 className="self-center font-extrabold tracking-wider">Reports</h1>
      <div className="flex flex-col items-center w-full gap-y-14">
        {/* Most Sold */}
        <MostSoldReport />
        {/* Daily Earnings */}
        <DailyEarningsReport />
      </div>
    </section>
  );
};

export default reports;
