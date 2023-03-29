import React from "react";

const Second = ({ page, setPage, formData, setFormData }) => {
  const handlebtnClick = (e) => {
    e.preventDefault();
    setFormData({ ...formData, subscriptionType: e.target.value });
  };
  return (
    <form>
      <h4>Subscription Type</h4>

      {/* <input
        type="text"
        placeholder="FullName"
        value={formData.fullname} //setting the value of the form to the props value
        onChange={
          (e) => setFormData({ ...formData, fullname: e.target.value }) //setting the formData to the value input of the textfield
        }
      /> */}
      <div className="table-view">
        <table
          className="data-tables table movie_table "
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th></th>
              <th>
                <button
                  className="button"
                  onClick={handlebtnClick}
                  value="free"
                >
                  Free
                </button>
              </th>
              <th>
                <button
                  className="button"
                  onClick={handlebtnClick}
                  value="paid"
                >
                  Paid
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Content</td>
              <td>Limited</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Ads</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>0$</td>
              <td>20$/Month</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="next-prev-btn">
        <button
          className="button"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </button>
        <button
          className="button"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Second;
