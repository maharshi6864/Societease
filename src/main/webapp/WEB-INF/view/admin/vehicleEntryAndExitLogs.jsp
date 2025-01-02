<%@ page contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<!-- Required meta tags -->
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<title>Admin | Index</title>
<!-- base:css -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/adminResources/css/materialdesignicons.min.css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/adminResources/css/vendor.bundle.base.css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/adminResources/css/fontAwesome/font-awesome.min.css" />
<!-- endinject -->
<!-- plugin css for this page -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/adminResources/css/dataTables.bootstrap4.css" />
<!-- End plugin css for this page -->
<!-- inject:css -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/adminResources/css/style.css" />
<!-- endinject -->
<link rel="shortcut icon"
	href="<%=request.getContextPath()%>/adminResources/image/favicon.png" />
</head>

<body>
	<div class="container-scroller">
		<!-- partial:partials/_navbar.html -->

		<jsp:include page="header.jsp" />

		<!-- partial -->
		<div class="container-fluid page-body-wrapper">
			<!-- partial:partials/_sidebar.html -->

			<jsp:include page="menu.jsp" />


			<!-- partial -->

			<div class="main-panel">
				<div class="content-wrapper">

					<div class="dashboard-header d-flex flex-column grid-margin">
						<div
							class="d-flex align-items-center justify-content-between flex-wrap">
							<div class="d-flex align-items-center">
								<h3 class="main-title d-flex align-items-center">
									<i class="mdi mdi-car icon-md mr-2 mt-0 "></i>Vehicles Entry And Exit Logs
								</h3>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xl-12 grid-margin">
									<div class="table-responsive">
                        <table id="custom-dataTable" class="table">
                            <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Vehicle Number</th>
                                <th>known/Unknown</th>
                                <th>Owner Info</th>
                                <th>Image</th>

                            </tr>
                            </thead>
                            <tbody id="member-table-view">
                            <%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
                            <%@taglib prefix="j" uri="https://example.com/functions" %>
                            <c:forEach items="${circularList}" var="i" varStatus="j">
                                <tr>

                                    <td>${j.count}</td>
                                    <td>${i.category}</td>
                                    <td><p class="a">${i.circularDescription}</p></td>
                                    <td>${i.circularFromDate} / ${i.circularFromTo}</td>
                                    <td><c:if
                                            test="${j:calculateAmount(i.circularFromDate,i.circularFromTo )}">
                                        <label class="badge badge-success">Valid</label>
                                    </c:if> <c:if
                                            test="${!j:calculateAmount(i.circularFromDate,i.circularFromTo )}">
                                        <label class="badge badge-danger">Expired</label>
                                    </c:if></td>
                                    <td><a class="nav-link"
                                            href="<%=request.getContextPath()%>/documents/circularAttachments/${i.circularAttactments}"
                                            download><i class="mdi mdi-link-variant menu-icon"
                                                        style="font-size: 15px"></i>
                                    </a></td>
                                    <td>
                                        <button class="btn btn-outline-info" data-toggle="modal"
                                                data-target="#exampleModal-add-circular"
                                                onclick="getCircular(${i.id})">Edit
                                        </button>
                                        <a
                                                href="deleteCircular/${i.id}">
                                            <button class="btn btn-outline-danger"
                                                    data-toggle="modal" data-target="#exampleModal-3">
                                                Delete
                                            </button>
                                        </a>
                                    </td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
              				</div>  
						</div>
					</div>


				</div>
				<!-- content-wrapper ends -->
				<!-- partial:partials/_footer.html -->

				<!-- partial -->
				<jsp:include page="../user/footer.jsp"></jsp:include>
			</div>

		</div>
	</div>

	<!-- content-wrapper ends -->
	<!-- partial:../../partials/_footer.html -->
	<!-- partial -->
	</div>
	<!-- main-panel ends -->
	</div>
	<!-- page-body-wrapper ends -->
	</div>
	<!-- container-scroller -->
	<!-- base:js -->

	<script
		src="<%=request.getContextPath()%>/adminResources/js/vendor.bundle.base.js"></script>


	<script
		src="<%=request.getContextPath()%>/adminResources/js/entryAndExitLog.js"></script>
	<!-- endinject -->
	<!-- inject:js -->
	<script
		src="<%=request.getContextPath()%>/adminResources/js/off-canvas.js"></script>
	<script
		src="<%=request.getContextPath()%>/adminResources/js/hoverable-collapse.js"></script>
	<script
		src="<%=request.getContextPath()%>/adminResources/js/template.js"></script>
	<script
		src="<%=request.getContextPath()%>/adminResources/js/settings.js"></script>
	<script
		src="<%=request.getContextPath()%>/adminResources/js/todolist.js"></script>
	<!-- endinject -->
	<!-- plugin js for this page -->
	<script
		src="<%=request.getContextPath()%>/adminResources/js/jquery.dataTables.js"></script>
	<script
		src="<%=request.getContextPath()%>/adminResources/js/dataTables.bootstrap4.js"></script>
	<!-- End plugin js for this page -->
	<!-- Custom js for this page-->
	<script
		src="<%=request.getContextPath()%>/adminResources/js/data-table.js"></script>
	<!-- End custom js for this page-->
	<script
		src="<%=request.getContextPath()%>/adminResources/js/highcharts.js"></script>
	<script
		src="<%=request.getContextPath()%>/adminResources/js/exporting.js"></script>
</body>
</html>
