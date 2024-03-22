<%@ page contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8"/>
    <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Admin | Block Details</title>
    <!-- base:css -->
    <link
            rel="stylesheet"
            href="<%=request.getContextPath()%>/adminResources/css/materialdesignicons.min.css"
    />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/adminResources/css/vendor.bundle.base.css"/>
    <!-- endinject -->
    <!-- plugin css for this page -->
    <link
            rel="stylesheet"
            href="<%=request.getContextPath()%>/adminResources/css/dataTables.bootstrap4.css"
    />
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/adminResources/css/style.css"/>
    <!-- endinject -->
    <link rel="shortcut icon" href="<%=request.getContextPath()%>/adminResources/image/favicon.png"/>
</head>

<body>
<div class="container-scroller">
    <!-- partial:partials/_navbar.html -->

    <jsp:include page="header.jsp"/>

    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_sidebar.html -->

        <jsp:include page="menu.jsp"/>
        <%@taglib prefix="f" uri="http://www.springframework.org/tags/form" %>

        <!-- Modal starts -->

        <div
                class="modal fade"
                id="exampleModal-3"
                tabindex="-1"
                role="dialog"
                aria-labelledby="ModalLabel"
                aria-hidden="true"

        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Add Block</h5>
                        <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onclick="emptyForm()"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <f:form action="blocks" method="post" modelAttribute="blockVo" class="model-form">
                        <div class=" row">
                            <div class="col-lg-12">
                                <label for="block-name" class="col-form-label"
                                >Block Name :
                                </label>
                           
                                <f:input
                                        type="hidden"
                                        class="form-control"
                                        id="block-id"
                                        path="id"
                                />

                                <f:input
                                        type="text"
                                        class="form-control"
                                        id="block-name"
                                        path="blockName"
                                />
                            </div>
                        </div>
                        <div class=" row">
                            <div class="col-lg-12">
                                <label for="number-of-floors" class="col-form-label"
                                >No of Floor:
                                </label>
                          
                                <f:input
                                        type="text"
                                        class="form-control"
                                        id="number-of-floors"
                                        path="noOfFloors"
                                        onkeyup="calHouse()"
                                />
                            </div>
                        </div>
                        <div class=" row">
                            <div class="col-lg-12">
                                <label for="house-on-each-floor" class="col-form-label"
                                >Houses on each floor :
                                </label>
                           
                                <f:input
                                        type="text"
                                        class="form-control"
                                        id="house-on-each-floor"
                                        path="houseOnEachFloor"
                                        onkeyup="calHouse()"
                                />
                            </div>
                        </div>
                        <div class=" row">
                            <div class="col-lg-12">
                                <label for="type-of-house" class="col-form-label"
                                >Type of houses:
                                </label>
                                <f:input
                                        type="text"
                                        class="form-control"
                                        id="type-of-house"
                                        path="typeOfHouse"
                                />
                            </div>
                        </div>
                        <div class="row" style="margin: 40px 0px 10px 0px !important;">
                            <div class="col-lg-4">
                                <label for="number-of-house" class="col-form-label" style="font-size: 20px;">
                                    Total Houses:
                                </label>
                            </div>
                            <div class="col-lg-8" >
                                <label for="number-of-house" class="col-form-label" style="font-size: 20px;" id="number-of-house">
                                    - -
                                </label>
                            </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary"
                            type="submit"
                            value="Submit"
                            id="submit">Submit
                    </button>
                    <button
                            type="button"
                            class="btn btn-light"
                            data-dismiss="modal"
                            onclick="emptyForm()"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    </f:form>
    <!-- Modal Ends -->

    <!-- partial -->

    <div class="main-panel">
        <div class="content-wrapper">
            <h3 class="main-title">Block Details</h3>
            <div
                    class="d-flex justify-content-between align-content-center"
                    style="margin-bottom: 20px"
            >
                <nav aria-label="breadcrumb d-flex align-content-center" class="bread">
                    <ol class="breadcrumb border-0 p-0 d-flex align-content-center">
                        <li class="breadcrumb-item"><a href="index">Dashboard</a></li>
                        <li class="breadcrumb-item active" aria-current="page">
                            Manage Blocks
                        </li>
                    </ol>
                </nav>
                <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        data-toggle="modal"
                        data-target="#exampleModal-3"
                >
                    Add Block
                </button>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table id="order-listing" class="table">
                                    <thead>
                                    <tr>
                                        <th>Block Name</th>
                                        <th>Number Of Floors</th>
                                        <th>House On Each Floor</th>
                                        <th>Type Of House</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
                                    <c:forEach items="${list}" var="i" varStatus="">
                                        <c:if test="${i.status}">
                                            <tr>
                                                <input type="hidden" value="${i.id}">
                                                <td>${i.blockName}</td>
                                                <td>${i.noOfFloors}</td>
                                                <td>${i.houseOnEachFloor}</td>
                                                <td>${i.typeOfHouse}</td>
                                                <td>
                                                    <button class="btn btn-outline-info" data-toggle="modal"
                                                            data-target="#exampleModal-3" onclick="editBlock(this)">
                                                        Edit
                                                    </button>
                                                    <a href="deleteBlocks/${i.id}">
                                                        <button class="btn btn-outline-danger" data-toggle="modal"
                                                                data-target="#exampleModal-3"
                                                                onclick="editBlock(this)">
                                                            Delete
                                                        </button>
                                                    </a></td>
                                            </tr>
                                        </c:if>
                                    </c:forEach>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- content-wrapper ends -->
        <!-- partial:../../partials/_footer.html -->

        <jsp:include page="../user/footer.jsp"></jsp:include>

        <!-- partial -->
    </div>
    <!-- main-panel ends -->
</div>
<!-- page-body-wrapper ends -->
</div>
<!-- container-scroller -->
<!-- base:js -->
<script src="<%=request.getContextPath()%>/adminResources/js/vendor.bundle.base.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/manageBlock.js"></script>
<!-- endinject -->
<!-- inject:js -->
<script src="<%=request.getContextPath()%>/adminResources/js/off-canvas.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/hoverable-collapse.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/template.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/settings.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/todolist.js"></script>
<!-- endinject -->
<!-- plugin js for this page -->
<script src="<%=request.getContextPath()%>/adminResources/js/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/adminResources/js/dataTables.bootstrap4.js"></script>
<!-- End plugin js for this page -->
<!-- Custom js for this page-->
<script src="<%=request.getContextPath()%>/adminResources/js/data-table.js"></script>
<!-- End custom js for this page-->
</body>
</html>
