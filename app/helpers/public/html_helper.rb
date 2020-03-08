module Public::HtmlHelper
  def body_data
    {
      controller: stimulus_controller_name
    }
  end

  def body_class_name
    "#{controller_path.gsub('/', '-')}-#{action_name}-body"
  end

  def stimulus_controller_name
    "#{controller_path.gsub('/', '--')}--#{action_name}"
  end
end
