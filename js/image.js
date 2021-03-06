//兼容IE11
if (!FileReader.prototype.readAsBinaryString) {
	FileReader.prototype.readAsBinaryString = function(fileData) {
		var binary = "";
		var pt = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			var bytes = new Uint8Array(reader.result);
			var length = bytes.byteLength;
			for (var i = 0; i < length; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			//pt.result  - readonly so assign binary
			pt.content = binary;
			pt.onload()
		}
		reader.readAsArrayBuffer(fileData);
	}
}


// $(document).ready(function () {
//     var videoIds;
//     var uploader;
//
//
//     function createUploader() {
//         var uploader = new AliyunUpload.Vod({
//             //阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
//             userId: "1494058750874094",
//             //分片大小默认1M，不能小于100K
//             partSize: 1048576,
//             //并行上传分片个数，默认5
//             parallel: 5,
//             //网络原因失败时，重新上传次数，默认为3
//             retryCount: 3,
//             //网络原因失败时，重新上传间隔时间，默认为2秒
//             retryDuration: 2,
//             //是否上报上传日志到点播，默认为true
//             enableUploadProgress: true,
//
//             // 添加文件成功
//             addFileSuccess: function (uploadInfo) {
//                 // $('#stsUpload').attr('disabled', false)
//                 // $('#resumeUpload').attr('disabled', false)
//                 // $('#status').text('添加文件成功, 等待上传...')
//                 console.log("addFileSuccess: " + uploadInfo.file.name)
//             },
//
//             // 开始上传
//             onUploadstarted: function (uploadInfo) {
//                 console.log(uploadInfo);
//                 console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
//                 //上传方式1, 需要根据uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
//                 if (uploadInfo.videoId) {
//                     // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
//                 } else {
//                     // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
//                 }
//                 // var stsUrl = 'http://47.103.41.41:8086/api/ImageAuth/GetUploadAuth';
//
//                 $.getJSON("http://47.103.41.41:8086/api/ImageAuth/GetUploadAuth", {}, function (data) {
//                     // console.log(data)
//                     var uploadAuth = data.data.response.UploadAuth;
//                     var uploadAddress = data.data.response.uploadAddress;
//                     var ImageId = data.data.response.ImageId;
//                     // var secretToken = info.SecurityToken
//                     // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
//                     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, ImageId);
//
//                 });
//
//
//                 // $.get(stsUrl, function (data) {
//                 //     var uploadAuth = data.UploadAuth;
//                 //     var uploadAddress = data.uploadAddress;
//                 //     var ImageId = data.ImageId;
//                 //     // var secretToken = info.SecurityToken
//                 //     // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
//                 //     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, ImageId);
//                 // }, 'json')
//
//
//                 //从点播服务获取的uploadAuth、uploadAddress和videoId,设置到SDK里
//             },
//             // 文件上传成功
//             onUploadSucceed: function (uploadInfo) {
//                 console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
//             },
//             // 文件上传失败
//             onUploadFailed: function (uploadInfo, code, message) {
//                 log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
//             },
//             // 文件上传进度，单位：字节
//             onUploadProgress: function (uploadInfo, totalSize, loadedPercent) {
//                 log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(loadedPercent * 100) + "%");
//             },
//             // 上传凭证超时
//             onUploadTokenExpired: function (uploadInfo) {
//                 console.log("onUploadTokenExpired");
//                 //实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
//                 //https://help.aliyun.com/document_detail/55408.html
//                 //从点播服务刷新的uploadAuth,设置到SDK里
//                 uploader.resumeUploadWithAuth(uploadAuth);
//             },
//             //全部文件上传结束
//             onUploadEnd: function (uploadInfo) {
//                 console.log("onUploadEnd: uploaded all the files");
//             }
//         });
//
//     }
//
//     userData = '';
//
//     // document.getElementById("fileUpload").addEventListener('change', function (event) {
//     //     console.log(event);
//     //     for (var i = 0; i < event.target.files.length; i++) {
//     //         // 逻辑代码
//     //         uploader.addFile(event.target.files[i], null, null, null, null);
//     //
//     //     }
//     //
//     //
//     // });
//
//     $('#fileUpload').on('change', function (e) {
//         console.log(e);
//         uploader = createUploader();
//         console.log(uploader);
//         // console.log(e.target.files.length);
//         // var file;
//         // for (let i = 0; i < e.target.files.length; i++) {
//         //     // console.log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
//         //     //     var file = e.target.files[i];
//         //     file = e.target.files[i];
//         //     var Title = e.target.files[i].name;
//         //     var userData = '{"Vod":{"Title":"' + Title + '","CateId":"1000027679"}}';
//         //     uploader.addFile(file, null, null, null, userData);
//         // }
//
//
//         //console.log(Title);
//         // if (uploader) {
//         //     uploader.stopUpload()
//         //     $('#sts-progress').text('0');
//         //     $('#status').text("");
//         // }
//
//         // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
//         //console.log(userData)
//         $('#stsUpload').attr('disabled', false)
//         $('#pauseUpload').attr('disabled', true)
//         $('#resumeUpload').attr('disabled', true)
//     })
//
//
//     $('#stsUpload').on('click', function () {
//
//         uploader.startUpload();
//     })
//
//     /*** 创建一个上传对象
//      * 使用 STSToken 上传方式*/
//     // function createUploader() {
//     //     var uploader = new AliyunUpload.Vod({
//     //         timeout: $('#timeout').val() || 60000,
//     //         partSize: $('#partSize').val() || 1048576,
//     //         parallel: $('#parallel').val() || 5,
//     //         retryCount: $('#retryCount').val() || 3,
//     //         retryDuration: $('#retryDuration').val() || 2,
//     //         region: $('#region').val(),
//     //         userId: $('#userId').val(),
//     //         // 添加文件成功
//     //         addFileSuccess: function (uploadInfo) {
//     //             $('#stsUpload').attr('disabled', false)
//     //             $('#resumeUpload').attr('disabled', false)
//     //             $('#status').text('添加文件成功, 等待上传...')
//     //             console.log("addFileSuccess: " + uploadInfo.file.name)
//     //         },
//     //         // 开始上传
//     //         onUploadstarted: function (uploadInfo) {
//     //             // 如果是 STSToken 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
//     //             // 用户需要自己获取 accessKeyId, accessKeySecret,secretToken
//     //             // 下面的 URL 只是测试接口, 用于获取 测试的 accessKeyId, accessKeySecret,secretToken
//     //
//     //             var stsUrl = "http://47.103.41.41:8083/api/AliSts/StsNetSdk";
//     //             $.getJSON(stsUrl, function (data) {
//     //                 var info = JSON.parse(data);
//     //
//     //                 var accessKeyId = info.AccessKeyId;
//     //                 var accessKeySecret = info.AccessKeySecret;
//     //                 var secretToken = info.SecurityToken;
//     //
//     //                 uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
//     //             });
//     //
//     //
//     //             $('#status').text('文件开始上传...')
//     //             console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" +
//     //                 uploadInfo.bucket + ", object:" + uploadInfo.object)
//     //         },
//     //         // 文件上传成功
//     //         onUploadSucceed: function (uploadInfo) {
//     //             console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" +
//     //                 uploadInfo.bucket + ", object:" + uploadInfo.object)
//     //             $('#status').text('文件上传成功!')
//     //
//     //
//     //             videoIds = uploadInfo.videoId;
//     //             //
//     //             console.log("videoIds:" + videoIds);
//     //             // console.log（(JSON.stringify(uploadInfo));
//     //             console.log(uploadInfo);
//     //         },
//     //         // 文件上传失败
//     //         onUploadFailed: function (uploadInfo, code, message) {
//     //             console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
//     //             $('#status').text('文件上传失败!')
//     //         },
//     //         // 取消文件上传
//     //         onUploadCanceled: function (uploadInfo, code, message) {
//     //             console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
//     //             $('#status').text('文件已暂停上传!')
//     //
//     //         },
//     //         // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
//     //         onUploadProgress: function (uploadInfo, totalSize, progress) {
//     //             console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" +
//     //                 Math.ceil(progress * 100) + "%")
//     //             var progressPercent = Math.ceil(progress * 100)
//     //             $('#sts-progress').text(progressPercent)
//     //             $('#status').text('文件上传中...')
//     //
//     //         },
//     //         // 上传凭证超时
//     //         onUploadTokenExpired: function (uploadInfo) {
//     //             // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
//     //             // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
//     //             // 这里是测试接口, 所以我直接获取了 STSToken
//     //             $('#status').text('文件上传超时!')
//     //
//     //             var stsUrl = 'http://47.103.41.41:8083/api/AliSts/StsNetSdk';
//     //             $.get(stsUrl, function (data) {
//     //                 var info = JSON.parse(data);
//     //                 console.log(info);
//     //                 // var info = data.SecurityTokenInfo
//     //                 var accessKeyId = info.AccessKeyId
//     //                 var accessKeySecret = info.AccessKeySecret
//     //                 var secretToken = info.SecurityToken
//     //                 var expiration = info.Expiration
//     //                 uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
//     //             }, 'json')
//     //
//     //
//     //         },
//     //         // 全部文件上传结束
//     //         onUploadEnd: function (uploadInfo) {
//     //             $('#status').text('文件上传完毕!')
//     //             console.log("onUploadEnd: uploaded all the files")
//     //
//     //
//     //         }
//     //     })
//     //     return uploader
//     // }
//     //
//     // // var videoIds;
//     // var uploader = null
//     //
//     // $('#fileUpload').on('change', function (e) {
//     //     console.log(e);
//     //
//     //     uploader = createUploader();
//     //     // console.log(e.target.files.length);
//     //     var file;
//     //     for (let i = 0; i < e.target.files.length; i++) {
//     //         // console.log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
//     //         //     var file = e.target.files[i];
//     //         file = e.target.files[i];
//     //         var Title = e.target.files[i].name;
//     //         var userData = '{"Vod":{"Title":"' + Title + '","CateId":"1000027679"}}';
//     //         uploader.addFile(file, null, null, null, userData);
//     //
//     //     }
//     //     if (!file) {
//     //         alert("请先选择需要上传的文件!");
//     //         return;
//     //     }
//     //     // console.log(file);
//     //
//     //     //console.log(Title);
//     //     if (uploader) {
//     //         uploader.stopUpload()
//     //         $('#sts-progress').text('0');
//     //         $('#status').text("");
//     //     }
//     //
//     //     // uploader.listFiles();
//     //     // var list = uploader.listFiles();
//     //     // for (var i = 0; i < list.length; i++) {
//     //     //     log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
//     //     // }
//     //
//     //
//     //     // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
//     //     //console.log(userData)
//     //     $('#stsUpload').attr('disabled', false)
//     //     $('#pauseUpload').attr('disabled', true)
//     //     $('#resumeUpload').attr('disabled', true)
//     // })
//     // // 开始上传
//     // $('#stsUpload').on('click', function () {
//     //     // 然后调用 startUpload 方法, 开始上传
//     //     console.log('1');
//     //     // uploader.listFiles();
//     //     // var list = uploader.listFiles();
//     //     // for (var i = 0; i < list.length; i++) {
//     //     //     console.log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
//     //     // }
//     //
//     //     // if (uploader !== null) {
//     //     uploader.startUpload()
//     //     $('#stsUpload').attr('disabled', true)
//     //     $('#pauseUpload').attr('disabled', false)
//     //     // }
//     // })
//     //
//     // $('#pauseUpload').on('click', function () {
//     //     if (uploader !== null) {
//     //         uploader.stopUpload()
//     //         $('#resumeUpload').attr('disabled', false)
//     //         $('#pauseUpload').attr('disabled', true)
//     //     }
//     // })
//     //
//     // $('#resumeUpload').on('click', function () {
//     //     if (uploader !== null) {
//     //         uploader.startUpload()
//     //         $('#resumeUpload').attr('disabled', true)
//     //         $('#pauseUpload').attr('disabled', false)
//     //     }
//     // });
//     //
//     //
//     // $('#dd').on('click', function () {
//     //     // window.close();
//     //     $(".main").css("display", "block");
//     //     $(".container").css("display", "none");
//     // });
//
// })

$(document).ready(function() {
	var oNum = 1;
	var videoIds;
	var editvideoIds;
	var uploader = null;
	var uploadingType;
	var videoList = [];
	var videoName = [];

	$("#inquire").click(function() {
		$('.table_tbody tr').remove();
		oNum = 1;
		var FType = $('#classes').val();
		// console.log(FType)
		$.getJSON("http://47.103.41.41:8086/api/Image/GetImageInfoList", {
			F_Type: FType,
			// F_Type: 'map',
			"pagination.rows": 10,
			"pagination.page": 1
		}, function(data) {
			console.log(data);
			for (var i = 0; i < data.data.rows.length; i++) {
				var htmlStr = ``;
				// var Hour = ((data.data.rows[i].F_Hour + '').length < 2) ? "0" + data.data.rows[i].F_Hour : data.data.rows[i].F_Hour;
				// var Minute = ((data.data.rows[i].F_Minute + '').length < 2) ? "0" + data.data.rows[i].F_Minute : data.data.rows[
				// 	i].F_Minute;
				// var Second = ((data.data.rows[i].F_Second + '').length < 2) ? "0" + data.data.rows[i].F_Second : data.data.rows[
				// 	i].F_Second;
				htmlStr +=
					`<tr id="${data.data.rows[i].F_Id}">
                <td class="table_span" style=" line-height:2.6;">${oNum++}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_RealName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_FileName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Order}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Type}</td>
                <td style=" line-height: 2.6;"><img class="td_image" src="${data.data.rows[i].F_Url}" alt=""></td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Screen}</td>
                <td>
                    <button class="btn btn-default" type="button">编辑</button>
                    <button class="btn btn-danger" type="button">删除</button>
                </td>
            </tr>`
				$(".table_tbody").append(htmlStr);
			}
		})
	});


	/*** 创建一个上传对象***/
	function createUploader() {
		var uploader = new AliyunUpload.Vod({
			// timeout: $('#timeout').val() || 60000,
			// partSize: $('#partSize').val() || 1048576,
			// parallel: $('#parallel').val() || 5,
			// retryCount: $('#retryCount').val() || 3,
			// retryDuration: $('#retryDuration').val() || 2,
			// region: $('#region').val(),
			// userId: $('#userId').val(),
			timeout: 60000,
			partSize: 1048576,
			parallel: 5,
			retryCount: 3,
			retryDuration: 2,
			region: "cn-shanghai",
			userId: 1494058750874094,

			// 添加文件成功
			addFileSuccess: function(uploadInfo) {
				$('#stsUpload').attr('disabled', false);
				// $('#resumeUpload').attr('disabled', false);
				$('#status').text('添加文件成功, 等待上传...');
				// console.log("addFileSuccess: " + uploadInfo.file.name);
			},
			//开始上传
			onUploadstarted: function(uploadInfo) {
				console.log(uploadInfo);
				// 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
				// 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
				// 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
				// 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
				// 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
				// 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
				if (!uploadInfo.videoId) {
					var createUrl = 'http://47.103.41.41:8086/api/ImageAuth/GetUploadAuth';
					var title = uploadInfo.file.name;
					console.log(title);
					$.get(createUrl, {
						Title: title
					}, function(data) {
						// $.get(createUrl, function (data) {
						var uploadAuth = data.data.response.UploadAuth;
						var uploadAddress = data.data.response.UploadAddress;
						var videoId = data.data.response.ImageId;
						uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
					}, 'json');
					$('#status').text('文件开始上传...');
					console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" +
						uploadInfo.bucket + ", object:" + uploadInfo.object)
				} else {
					// 如果videoId有值，根据videoId刷新上传凭证
					// https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
					// var refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
					// $.get(refreshUrl, function (data) {
					//     var uploadAuth = data.data.response.UploadAuth
					//     var uploadAddress = data.data.response.UploadAddress
					//     var videoId = data.data.response.ImageId
					//     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
					// }, 'json')
				}

				$('#status').text('文件开始上传...')
				console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" +
					uploadInfo.bucket + ", object:" + uploadInfo.object)

				// console.log(uploadInfo);
				// console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
				// //上传方式1, 需要根据uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
				// if (uploadInfo.videoId) {
				//     // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
				// } else {
				//     // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
				// }
				// // var stsUrl = 'http://47.103.41.41:8086/api/ImageAuth/GetUploadAuth';
				//
				// $.getJSON("http://47.103.41.41:8086/api/ImageAuth/GetUploadAuth", {}, function (data) {
				//     console.log(data)
				//     var uploadAuth = data.data.response.UploadAuth;
				//     var uploadAddress = data.data.response.uploadAddress;
				//     var VideoId = data.data.response.ImageId;
				//     // var secretToken = info.SecurityToken
				//     // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
				//     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, VideoId);
				//
				// });
				// $('#status').text('文件开始上传...')
				// console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" +
				//     uploadInfo.bucket + ", object:" + uploadInfo.object)
				// // $.get(stsUrl, function (data) {
				// //     var uploadAuth = data.UploadAuth;
				// //     var uploadAddress = data.uploadAddress;
				// //     var ImageId = data.ImageId;
				// //     // var secretToken = info.SecurityToken
				// //     // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
				// //     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, ImageId);
				// // }, 'json')
				//
				//
				// //从点播服务获取的uploadAuth、uploadAddress和videoId,设置到SDK里
			},


			// 文件上传成功
			onUploadSucceed: function(uploadInfo) {
				console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" +
					uploadInfo.bucket + ", object:" + uploadInfo.object);

				videoIds = uploadInfo.videoId;
				console.log(videoIds);
				// var F_Order = $('#F_Order').val();
				var F_Type = $('#select1').val();
				var F_Screen = $('#select2').val();

				if (uploadingType == 'add') {
					$.post('http://47.103.41.41:8086/api/Image/InsertImageInfo', {
						"F_Order": videoName[0],
						"F_Type": F_Type,
						"F_AliImageId": videoIds,
						"F_Screen": F_Screen
					}, function(data) {
						console.log(data);
					}, 'json');
					videoName.splice(0, 1);
					console.log(videoName);
				} else if (uploadingType == 'edit') {
					$.post('http://47.103.41.41:8086/api/Image/UpdateImageInfo', {
						"F_Order": videoName[0],
						// "F_Order": F_Order,
						"F_Type": F_Type,
						"F_AliImageId": videoIds,
						"F_Id": editvideoIds,
						"F_Screen": F_Screen
					}, function(data) {
						console.log(data);
					}, 'json');
					videoName.splice(0, 1);
					$('.intro').parents("tr").css("background-color", "#ffffff");
					$('.intro').removeClass("intro");
				}

				// $.ajax({
				// 	url: 'http://47.103.41.41:8086/api/Image/InsertImageInfo',
				// 	datatype: "json",
				// 	type: 'post',
				// 	data: {
				// 		"F_Order": 0,
				// 		"F_Type": "map",
				// 		"F_AliImageId": videoIds
				// 	},
				// 	success: function(e) { //成功后回调
				// 		alert(e);
				// 		console.log(e)
				// 	},
				// 	error: function(e) { //失败后回调
				// 		// alert(e);
				// 	},
				// 	beforeSend: function() {
				// 		// /发送请求前调用，可以放一些"正在加载"之类额话
				// 		// alert("正在加载");
				// 	}
				// })

				console.log("videoIds:" + videoIds);
				console.log(uploadInfo);
				$('#status').text('文件上传成功!');
				// $('#F_Order').val('');
				// console.log（(JSON.stringify(uploadInfo));
			},
			// 文件上传失败
			onUploadFailed: function(uploadInfo, code, message) {
				console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
				$('#status').text('文件上传失败!')
			},
			// 取消文件上传
			onUploadCanceled: function(uploadInfo, code, message) {
				console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
				$('#status').text('文件已暂停上传!')

			},
			// 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
			onUploadProgress: function(uploadInfo, totalSize, progress) {
				console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" +
					Math.ceil(progress * 100) + "%");
				var progressPercent = Math.ceil(progress * 100);
				$('#sts-progress').text(progressPercent);
				$('#status').text('文件上传中...');

			},
			// 上传凭证超时
			onUploadTokenExpired: function(uploadInfo) {
				// 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
				// 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
				// 这里是测试接口, 所以我直接获取了 STSToken
				$('#status').text('文件上传超时!');

				var stsUrl = 'http://47.103.41.41:8083/api/AliSts/StsNetSdk';
				$.get(stsUrl, function(data) {
					var info = JSON.parse(data);
					console.log(info);
					// var info = data.SecurityTokenInfo
					var accessKeyId = info.AccessKeyId;
					var accessKeySecret = info.AccessKeySecret;
					var secretToken = info.SecurityToken;
					var expiration = info.Expiration;
					uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
				}, 'json')


			},
			// 全部文件上传结束
			onUploadEnd: function(uploadInfo) {
				$('#status').text('文件上传完毕!');
				console.log("onUploadEnd: uploaded all the files");
			}
		})
		return uploader
	}


	$('#fileUpload').on('change', function(e) {
		console.log(e);
		uploader = createUploader();
		console.log(uploader);
		var file;
		for (let i = 0; i < e.target.files.length; i++) {
			// console.log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
			//     var file = e.target.files[i];
			file = e.target.files[i];
			var Title = e.target.files[i].name;
			// var oname = e.target.files[i].name.split("_").split(".");
			// var oname = e.target.files[i].name.indexOf('.');
			let oname = e.target.files[i].name.substring(0, e.target.files[i].name.indexOf('.'));
			let aname = oname.substring(oname.indexOf('_') + 1);

			videoName.push(aname);
			console.log(videoName);
			// console.log(Title);
			// var userData = '{"Vod":{"Title":"' + Title + '","CateId":"1000027679"}}';
			var userData = '{"Vod":{}}';
			uploader.addFile(file, null, null, null, userData);
			videoList.push(Title);

		}
		// if (!file) {
		//     alert("请先选择需要上传的文件!");
		//     return;
		// }
		// // console.log(file);
		//
		// //console.log(Title);
		if (uploader) {
			uploader.stopUpload()
			$('#sts-progress').text('0');
			$('#status').text("");
		}

		// // uploader.listFiles();
		// // var list = uploader.listFiles();
		// // for (var i = 0; i < list.length; i++) {
		// //     log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
		// // }
		//
		// // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
		// //console.log(userData)
		$('#stsUpload').attr('disabled', false);
		$('#compile').attr('disabled', false);
		// $('#pauseUpload').attr('disabled', true)
		// $('#resumeUpload').attr('disabled', true)
	})
	// 开始上传
	$('#stsUpload').on('click', function() {
		// 然后调用 startUpload 方法, 开始上传
		// var F_Order = $('#F_Order').val();
		var F_Type = $('#select1').val();
		var IfDuplicate = true;
		uploadingType = 'add';
		// if (!F_Order) {
		// 	alert('请输入序号');
		// } else {

		for (let i = 0; i < videoList.length; i++) {
			console.log(videoList[i]);
			$.ajax({
				url: 'http://47.103.41.41:8086/api/Image/IfDuplicate',
				datatype: "json",
				type: 'post',
				async: false,
				data: {
					F_Action: "Add",
					F_Id: "",
					F_Type: F_Type,
					F_FileName: videoList[i],
				},
				success: function(e) { //成功后回调
					console.log(e);
					if (e.data.status == 1) {
						alert('该文件已存在');
						IfDuplicate = false;
						videoList = [];
						return i = videoList.length;
					}
				},
				error: function(e) { //失败后回调
				},
				beforeSend: function() { // /发送请求前调用，可以放一些"正在加载"之类额话
					// alert("正在加载");
				}
			});
			// console.log(parseInt([i])+1)
			if (parseInt([i]) + 1 == videoList.length) {
				if (IfDuplicate) {
					uploader.startUpload();
					$('#stsUpload').attr('disabled', true);
					videoList = [];
				}
			}

		}

		// }

		// if (uploader !== null) {
		// uploader.startUpload();
		// $('#stsUpload').attr('disabled', true)
		// $('#pauseUpload').attr('disabled', false)
		// }
	});

	$(".table_tbody").on("click", ".btn-default", function() { //编辑
		$("#stsUpload").css("display", "none");
		$("#compile").css("display", "block");
		var F_Id = $(this).parents("tr").attr('id');
		editvideoIds = $(this).parents("tr").attr('id');
		$.get('http://47.103.41.41:8086/api/Image/GetImageInfoById', {
			F_Id: F_Id
		}, function(data) {
			// console.log(data);
			// $('#F_Order').val(data.data.dt[0].F_Order);
			$('#select1').val(data.data.dt[0].F_Type);
			$('#select2').val(data.data.dt[0].F_Screen);
		});
		$(this).parents("tr").css("background-color", "#e5f58c");
		$(this).addClass("intro");
	});
	$('#compile').on('click', function() { //编辑新增
		// console.log('1');
		// var F_Order = $('#F_Order').val();
		// var F_Type = $('#select1').val();
		// editvideoIds = $(this).parents("tr").attr('id');
		uploadingType = 'edit';
		// var IfDuplicate = true;
		$("#stsUpload").css("display", "block");
		$("#compile").css("display", "none");
		// if (!F_Order) {
		// 	alert('请输入序号');
		// } else {
		uploader.startUpload();
		// $('#stsUpload').attr('disabled', true);
		// }
	});


	$(".table_tbody").on("click", ".btn-danger", function() { //删除
		var F_Id = $(this).parents("tr").attr('id');
		$.get('http://47.103.41.41:8086/api/Image/DeleteImageInfo', {
			F_Id: F_Id
		}, function(data) {
			console.log(data);
		});
		$(this).parents("tr").remove();
	});

	$(".navigation").on("click", "li", function() { //切换页数
		var oindex = $(this).data('index');
		// $(this).data(index,'2');
		// console.log(oindex);
		$('.table_tbody tr').remove();
		oNum = 1;
		var FType = $('#classes').val();
		// console.log(FType)
		$.getJSON("http://47.103.41.41:8086/api/Image/GetImageInfoList", {
			F_Type: FType,
			// F_Type: 'map',
			"pagination.rows": 10,
			"pagination.page": oindex
		}, function(data) {
			console.log(data);
			for (var i = 0; i < data.data.rows.length; i++) {
				var htmlStr = ``;
				var Hour = ((data.data.rows[i].F_Hour + '').length < 2) ? "0" + data.data.rows[i].F_Hour : data.data.rows[i].F_Hour;
				var Minute = ((data.data.rows[i].F_Minute + '').length < 2) ? "0" + data.data.rows[i].F_Minute : data.data.rows[
					i].F_Minute;
				var Second = ((data.data.rows[i].F_Second + '').length < 2) ? "0" + data.data.rows[i].F_Second : data.data.rows[
					i].F_Second;
				htmlStr +=
					`<tr id="${data.data.rows[i].F_Id}">
                <td class="table_span" style=" line-height:2.6;">${oNum++}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_RealName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_FileName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Order}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Type}</td>
                <td style=" line-height: 2.6;"><img class="td_image" src="${data.data.rows[i].F_Url}" alt=""></td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Screen}</td>
                <td>
                    <button class="btn btn-default" type="button">编辑</button>
                    <button class="btn btn-danger" type="button">删除</button>
                </td>
            </tr>`;
				$(".table_tbody").append(htmlStr);
			}
		})
	});

	// $('#pauseUpload').on('click', function() {
	// 	if (uploader !== null) {
	// 		uploader.stopUpload()
	// 		$('#resumeUpload').attr('disabled', false)
	// 		$('#pauseUpload').attr('disabled', true)
	// 	}
	// })

	// $('#resumeUpload').on('click', function() {
	// 	if (uploader !== null) {
	// 		uploader.startUpload()
	// 		$('#resumeUpload').attr('disabled', true)
	// 		$('#pauseUpload').attr('disabled', false)
	// 	}
	// });

	$('#quit').on('click', function() { //关闭
		window.close();
		// $(".main").css("display", "block");
		// $(".container").css("display", "none");
		// $(".main").css("display", "none");
		// $(".contain").css("display", "block");

	});


})
